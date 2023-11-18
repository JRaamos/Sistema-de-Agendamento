import moment from 'moment-timezone';
import cron from 'node-cron';
import schedulesService from '../services/schedules.service';

const sendNotification = async (deviceIds: (string | null | undefined)[] , message: string) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic NzAzNTI5YmEtYjY4MC00NDZmLWEwOGItNGFjNGI4NWI1MjIz`
  };

  const data = {
    app_id: "2f865a87-c988-43e8-a60c-2138cc52199b",
    include_player_ids: deviceIds,
    contents: { en: message }
  };

  const response = await fetch("https://onesignal.com/api/v1/notifications", {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data)
  });

  const responseData = await response.json();
  console.log("Resposta do OneSignal:", responseData);
  return responseData;
};


export const checkForUpcomingAppointments = async () => {
  const nowSaoPaulo = moment().tz('America/Sao_Paulo').toDate();
  const today = nowSaoPaulo.toISOString().split('T')[0]; // Formato YYYY-MM-DD
  const schedules = await schedulesService.finaAllSchedulesDate(today);

  schedules.forEach(schedule => {
    const scheduleDateTimeSaoPaulo = moment.tz(`${schedule.date}T${schedule.hour}`, 'America/Sao_Paulo').toDate();
    const diffInMilliseconds = scheduleDateTimeSaoPaulo.getTime() - nowSaoPaulo.getTime();
    const diffInMinutes = Math.round(diffInMilliseconds / 60000); // Arredondado para cima
    console.log(diffInMinutes);
    
    const message = `Lembrete de agendamento para ${schedule.date} às ${schedule.hour}`;
    if (diffInMinutes === 30) {
      // Enviar a notificação real
      sendNotification([schedule.user.deviceId], message);
      console.log(`Notificação enviada para ${schedule.user.name} (Device ID: ${schedule.user.deviceId}) - Mensagem: "${message}"`);
    }
  });
};