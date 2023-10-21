import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import { Schedule } from '../types/schedules';

const createSchedule = async (schedule: ScheduleInputtableTypes):
Promise<Schedule> => {
  const { date, hour, userId, serviceId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId, serviceId });
  return scheduleResult.dataValues as Schedule;
};

export default { createSchedule };