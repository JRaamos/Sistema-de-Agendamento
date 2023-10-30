import sequelize from 'sequelize';
import CancellationModel, { CancellationInputtableTypes } 
  from '../database/models/cancellation.model';

const createCancellation = async (cancellation: CancellationInputtableTypes):
Promise<void> => {
  await CancellationModel.create(cancellation);
};

const countCancellation = async (rageDays: number) => {
  const dateStart = new Date();
  dateStart.setDate(dateStart.getDate() - rageDays);

  const result = await CancellationModel.count({
    where: {
      dateSchedule: {
        [sequelize.Op.gte]: dateStart, 
      },
    },
  });

  return result;
};

export default { createCancellation, countCancellation };