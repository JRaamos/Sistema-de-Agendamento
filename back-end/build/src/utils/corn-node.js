"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.scheduleCancelation = exports.checkForUpcomingAppointments = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const functions_1 = require("./functions");
const sendNotification = async (deviceIds, message) => {
    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
        // localHost
        // Authorization: 'Basic OTMyOTFjZjctYWI3MS00YmU5LWJhOWEtY2IxMjgzY2JiNDlh',
        // produção
        Authorization: 'Basic NzAzNTI5YmEtYjY4MC00NDZmLWEwOGItNGFjNGI4NWI1MjIz',
    };
    const data = {
        // produção
        app_id: '2f865a87-c988-43e8-a60c-2138cc52199b',
        // localHost
        // app_id: 'dd8d9c1d-7da4-4aa3-800e-bd5ebe075063',
        include_player_ids: deviceIds,
        contents: { en: message },
    };
    const response = await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers,
        body: JSON.stringify(data),
    });
    const responseData = await response.json();
    console.log('Resposta do OneSignal:', responseData);
    return responseData;
};
const checkForUpcomingAppointments = async () => {
    const nowSaoPaulo = (0, moment_timezone_1.default)().tz('America/Sao_Paulo').toDate();
    const today = nowSaoPaulo.toISOString().split('T')[0]; // Formato YYYY-MM-DD
    const schedules = await schedules_service_1.default.finaAllSchedulesDate(today);
    if (schedules.status !== 'SUCCESSFUL') {
        return;
    }
    schedules.data.forEach((schedule) => {
        const scheduleDateTimeSaoPaulo = moment_timezone_1.default.tz(`${schedule.date}T${schedule.hour}`, 'America/Sao_Paulo').toDate();
        const diffInMilliseconds = scheduleDateTimeSaoPaulo.getTime() - nowSaoPaulo.getTime();
        const diffInMinutes = Math.round(diffInMilliseconds / 60000); // Arredondado para cima
        console.log(diffInMinutes);
        // const newdate = convertDateFormat(schedule.date);
        const message = `Lembrete de agendamento: Sr(a) ${schedule.user.name},
    Não se esqueça do seu agendamento daqui a pouco ás ${schedule.hour}`;
        if (diffInMinutes === 30) {
            sendNotification([schedule.user.deviceId], message);
            console.log(`Notificação enviada para ${schedule.user.name}
       (Device ID: ${schedule.user.deviceId}) - Mensagem: "${message}"`);
        }
    });
};
exports.checkForUpcomingAppointments = checkForUpcomingAppointments;
const scheduleCancelation = async (name, date, hour, deviceId) => {
    const newdate = (0, functions_1.convertDateFormat)(date);
    const message = ` Prezado(a) ${name}, lamentamos informar que seu 
  agendamento para ${newdate} as ${hour} foi cancelado. 
  Estamos à disposição para reagendar conforme sua 
  conveniência. Pedimos desculpas pelo inconveniente e agradecemos sua compreensão.`;
    sendNotification([deviceId], message);
};
exports.scheduleCancelation = scheduleCancelation;
