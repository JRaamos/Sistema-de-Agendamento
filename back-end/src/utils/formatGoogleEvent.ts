import moment from 'moment-timezone';
import { GoogleEvent, SchedulesEvent } from '../types/GoogleEvent';
import servicesJson from './services.json';

const timeZone = 'America/Sao_Paulo';
const calcTotalTime = (services: string[]): number => {
  const servicesTime = servicesJson.filter((service) => services.includes(service.services))
    .map((service) => service.duration);
  return servicesTime.reduce((acc, curr) => acc + curr, 0);
};

const transformToGoogleEvent = (data: SchedulesEvent): GoogleEvent => {
  const [month, day, year] = data.date.split('/');
  const formattedDate = `${year}-${month}-${day}T${data.hour}:00`;

  const startTime = moment.tz(formattedDate, timeZone).format();

  const totalTime = calcTotalTime(data.services);

  const endTime = moment.tz(startTime, timeZone).add(totalTime, 'minutes').format();

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

export default transformToGoogleEvent;
