import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import { Schedule } from '../types/schedules';
import ScheduleServiceModel from '../database/models/scheduleService.model';

const createSchedule = async (schedule: ScheduleInputtableTypes):
Promise<Schedule> => {
  const { date, hour, userId } = schedule;

  const scheduleResult = await ScheduleModel.create({ date, hour, userId });
  return scheduleResult.dataValues as Schedule;
};

const finaAllSchedulesDate = async (date: string): Promise<Schedule[]> => {
  const scheduleResult = await ScheduleModel.findAll({ where: { date } });
  const scheduleIds = scheduleResult.map((schedule) => schedule.dataValues.scheduleId);

  const scheduleServices = await ScheduleServiceModel.findAll({
    where: { scheduleId: scheduleIds },
  });
  console.log(scheduleServices.map((schedule) => schedule.dataValues));
  
  return scheduleResult.map((schedule) => schedule.dataValues) as Schedule[];
};

export default { createSchedule, finaAllSchedulesDate };