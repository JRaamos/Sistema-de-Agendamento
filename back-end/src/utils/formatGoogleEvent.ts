import moment from 'moment-timezone';
import { GoogleEvent, SchedulesEvent } from '../types/GoogleEvent';
import  getAllService  from '../services/service.service';

const timeZone = 'America/Sao_Paulo';
const calcTotalTime = async (services: string[]):Promise<number> => {
  const {data, status} = await getAllService.getAllService();
  if (status === 'NOT_FOUND') {
    return 0;
  }
  const servicesTime = Array.isArray(data) ? data.filter((service) => services.includes(service.dataValues.service as string))
    .map((service) => service.dataValues.duration) : [];
  return servicesTime.reduce((acc, curr) => acc + curr, 0);
};

const transformToGoogleEvent = async (data: SchedulesEvent):Promise<GoogleEvent> => {
  const [month, day, year] = data.date.split('/');
  const formattedDate = `${year}-${month}-${day}T${data.hour}:00`;

  const startTime = moment.tz(formattedDate, timeZone).format();

  const totalTime = await calcTotalTime(data.services);

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
