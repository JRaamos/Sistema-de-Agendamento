import moment from 'moment-timezone';
import cron from 'node-cron';
import schedulesService from '../services/schedules.service';

const sendNotification = async (deviceIds: (string | null | undefined)[] , message: string) => {
  const headers = {
    "Content-Type": "application/json; charset=utf-8",
    "Authorization": `Basic M2MyNWY0MWYtNzMyZS00MThkLWIzOTUtYmEyNWQwMDI5ODE0`
  };

  const data = {
    app_id: "0e7089e8-60f2-480b-bafa-1173e57cac11",
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
    const diffInMinutes = Math.floor(diffInMilliseconds / 60000); // Arredondado para baixo
    console.log(diffInMinutes);
    
    const message = `Lembrete de agendamento para ${schedule.date} às ${schedule.hour}`;
    if (diffInMinutes === 30) {
      // Enviar a notificação real
      sendNotification([schedule.user.deviceId], message);
      console.log(`Notificação enviada para ${schedule.user.name} (Device ID: ${schedule.user.deviceId}) - Mensagem: "${message}"`);
    }
  });
};