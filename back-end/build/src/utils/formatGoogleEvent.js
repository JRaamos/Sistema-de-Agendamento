"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const services_json_1 = __importDefault(require("./services.json"));
const timeZone = 'America/Sao_Paulo';
const calcTotalTime = (services) => {
    const servicesTime = services_json_1.default.filter((service) => services.includes(service.services))
        .map((service) => service.duration);
    return servicesTime.reduce((acc, curr) => acc + curr, 0);
};
const transformToGoogleEvent = (data) => {
    const [month, day, year] = data.date.split('/');
    const formattedDate = `${year}-${month}-${day}T${data.hour}:00`;
    const startTime = moment_timezone_1.default.tz(formattedDate, timeZone).format();
    const totalTime = calcTotalTime(data.services);
    const endTime = moment_timezone_1.default.tz(startTime, timeZone).add(totalTime, 'minutes').format();
    return {
        summary: `Agendamento de ${data.name}`,
        location: 'Stylus Barbearia',
        description: `Serviços: ${data.services.join(', ')}. Contato: ${data.phone}`,
        start: { dateTime: startTime, timeZone },
        end: {
            dateTime: endTime, timeZone,
        },
    };
};
exports.default = transformToGoogleEvent;
