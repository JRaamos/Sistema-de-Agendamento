import ScheduleModel, { ScheduleInputtableTypes } from '../database/models/schedules.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Schedule } from '../types/schedules';

const createSchedule = async (schedule: ScheduleInputtableTypes):
Promise<ServiceResponse<Schedule>> => {
  const { date, hour, userId, serviceId } = schedule;

  if (!date || !hour || !userId || !serviceId) {
    return {
      status: 'INVALID_DATA',
      data: { message: 'Date, hour, userId and serviceId are required' },
    };
  }

  const scheduleResult = await ScheduleModel.create({ date, hour, userId, serviceId });
  return { status: 'SUCCESSFUL', data: scheduleResult.dataValues };
};

export default { createSchedule };