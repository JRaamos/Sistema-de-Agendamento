import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import ServiceModel from '../database/models/service.model';
import { Schedule } from '../types/schedules';

const createSchedule = async (schedule: ScheduleInputtableTypes):
Promise<Schedule> => {
  const { date, hour, userId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId });
  return scheduleResult.dataValues as Schedule;
};

const finaAllSchedulesDate = async (date: string) => {
  const schedulesWithServices = await ScheduleModel.findAll({
    where: { date },
    include: {
      model: ServiceModel, // Use o modelo ServiceModel
      as: 'services', // A associação é chamada 'services'
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
  });

  return schedulesWithServices;
};

export default { createSchedule, finaAllSchedulesDate };