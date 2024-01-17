import moment from 'moment-timezone';
import schedulesService from '../services/schedules.service';
import { convertDateFormat } from './functions';

const sendNotification = async (deviceIds: (string | null | undefined)[], message: string) => {
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

export const checkForUpcomingAppointments = async () => {
  const nowSaoPaulo = moment().tz('America/Sao_Paulo').toDate();
  const today = nowSaoPaulo.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const schedules = await schedulesService.finaAllSchedulesDate(today);
  if (schedules.status !== 'SUCCESSFUL') {
    return;
  }
  schedules.data.forEach((schedule) => {
    const scheduleDateTimeSaoPaulo = moment.tz(
      `${schedule.date}T${schedule.hour}`,
      'America/Sao_Paulo',
    ).toDate();
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

export const scheduleCancelation = async (
  name: string, 
  date: string, 
  hour: string, 
  deviceId: string | null | undefined,
) => {
  const newdate = convertDateFormat(date);
  const message = ` Prezado(a) ${name}, lamentamos informar que seu 
  agendamento para ${newdate} as ${hour} foi cancelado. 
  Estamos à disposição para reagendar conforme sua 
  conveniência. Pedimos desculpas pelo inconveniente e agradecemos sua compreensão.`;
  sendNotification([deviceId], message);
};