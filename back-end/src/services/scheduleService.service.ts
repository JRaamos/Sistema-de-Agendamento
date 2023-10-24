import ScheduleServiceModel from '../database/models/scheduleService.model';

const createScheduleService = async (scheduleId: number, serviceId: number): Promise<number> => {
  const scheduleServiceResult = await ScheduleServiceModel.create({ scheduleId, serviceId });
  return scheduleServiceResult.dataValues.id;
};

export default { createScheduleService };