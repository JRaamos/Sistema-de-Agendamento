import ServiceModel from '../database/models/service.model';
import { ServiceResponse } from '../types/ServiceResponse';

const findAllService = async (services: string[]): Promise<ServiceResponse<number[]>> => {
  const serviceResults = await ServiceModel.findAll({
    where: { service: services },
  });
  if (!serviceResults) {
    return {
      status: 'NOT_FOUND', data: { message: 'Serviço não encontrado' } };
  }

  const serviceIds = services.map((service) => {
    const foundService = serviceResults.find((result) => result.dataValues.service === service);
    return foundService ? foundService.dataValues.serviceId : null;
  });

  const ids = serviceIds.filter((id) => id !== null);

  return { status: 'SUCCESSFUL', data: ids as number[] };
};

export default { findAllService };
