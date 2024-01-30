import ServiceModel, {
  ServiceInputtableTypes,
  ServiceSequelizeModel,
} from '../database/models/service.model';
import { ServiceResponse } from '../types/ServiceResponse';

const notFound = 'Serviço não encontrado';

const findAllService = async (
  services: string[],
): Promise<ServiceResponse<number[]>> => {
  const serviceResults = await ServiceModel.findAll({
    where: { service: services },
  });
  if (!serviceResults) {
    return {
      status: 'NOT_FOUND',
      data: { message: notFound },
    };
  }

  const serviceIds = services.map((service) => {
    const foundService = serviceResults.find(
      (result) => result.dataValues.service === service,
    );
    return foundService ? foundService.dataValues.serviceId : null;
  });

  const ids = serviceIds.filter((id) => id !== null);

  return { status: 'SUCCESSFUL', data: ids as number[] };
};

const findByNameService = async (
  service: string,
): Promise<ServiceResponse<ServiceSequelizeModel>> => {
  const serviceResult = await ServiceModel.findOne({
    where: { service },
  });
  if (!serviceResult) {
    return {
      status: 'NOT_FOUND',
      data: { message: notFound },
    };
  }

  return { status: 'SUCCESSFUL', data: serviceResult };
};

const updateServiceByName = async (
  name: string,
  service: ServiceInputtableTypes,
): Promise<ServiceResponse<{ message: string }>> => {
  const serviceResult = await ServiceModel.update(service, {
    where: { service: name },
  });
  if (!serviceResult) {
    return {
      status: 'NOT_FOUND',
      data: { message: notFound },
    };
  }

  return { status: 'SUCCESSFUL', data: { message: 'Serviço atualizado com sucesso' } };
};

export default { findAllService, findByNameService, updateServiceByName };
