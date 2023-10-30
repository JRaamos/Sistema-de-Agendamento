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
      model: ServiceModel,
      as: 'services',
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
  });

  return schedulesWithServices;
};

const findByScheduleDateId = async (date: string, hour: string) => {
  const schedulesWithServices = await ScheduleModel.findOne({
    where: { date, hour },
    include: {
      model: ServiceModel,
      as: 'services',
      attributes: ['service', 'price', 'duration'],
      through: { attributes: [] },
    },
  });

  return schedulesWithServices;
};

const deleteSchedule = async (scheduleId: number) => {
  await ScheduleModel.destroy({ where: { scheduleId } });
};

export default { createSchedule, finaAllSchedulesDate, findByScheduleDateId, deleteSchedule };