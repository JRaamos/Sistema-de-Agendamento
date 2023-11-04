import sequelize from 'sequelize';
import CancellationModel, { CancellationInputtableTypes } 
  from '../database/models/cancellation.model';
import moment from 'moment-timezone';


const createCancellation = async (cancellation: CancellationInputtableTypes):
Promise<void> => {
  await CancellationModel.create(cancellation);
};

const countCancellation = async (rageDays: number) => {
  const now = moment.tz('America/Sao_Paulo');
  const currentDate = now.format('YYYY-MM-DD');
  const currentTime = now.format('HH:mm:ss');

  let dateStart = new Date(currentDate + ' ' + currentTime);

  if (rageDays > 0) {
    dateStart = now.subtract(rageDays, 'days').toDate();
  } else {

    dateStart = new Date('1970-01-01');
  }

  dateStart.setHours(0, 0, 0, 0);

  const result = await CancellationModel.count({
    where: {
      dateSchedule: {
        [sequelize.Op.between]: [dateStart, currentDate + ' ' + currentTime],
      },
    },
  });

  return result;
};


export default { createCancellation, countCancellation };