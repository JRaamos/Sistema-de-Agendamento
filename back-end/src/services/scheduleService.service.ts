import ScheduleServiceModel from '../database/models/scheduleService.model';
import { ServiceResponse } from '../types/ServiceResponse';

const createScheduleService = async (scheduleId: number, serviceId: number): 
Promise<ServiceResponse <number>> => {
  const scheduleServiceResult = await ScheduleServiceModel.create({ scheduleId, serviceId });
  if (!scheduleServiceResult) {
    return {
      status: 'NOT_FOUND', data: { message: 'Serviço não encontrado' } };
  }

  return { status: 'SUCCESSFUL', data: scheduleServiceResult.dataValues.id };
};

export default { createScheduleService };