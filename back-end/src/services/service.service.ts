import ServiceModel, {
  ServiceSequelizeModel,
} from '../database/models/service.model';
import { ServiceResponse } from '../types/ServiceResponse';
import { Service } from '../types/Services';

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

const getAllService = async (): Promise<ServiceResponse<ServiceSequelizeModel[]>> => {
  const serviceResult = await ServiceModel.findAll();
  
  if (!serviceResult) {
    return {
      status: 'NOT_FOUND',
      data: { message: notFound },
    };
  }

  return { status: 'SUCCESSFUL', data: serviceResult };
};

const UpdatePriceServiceByName = async (name: string, service: Partial<Service>): 
Promise<ServiceResponse<{ message: string }>> => {
  const serviceResult = await ServiceModel.update(service, {
    where: { service: name },
  });
  
  if (serviceResult[0] === 0) {
    return {
      status: 'NOT_FOUND',
      data: { message: 'Serviço não encontrado ou o serviço ja esta com o preço atualizado' },
    };
  }

  return { status: 'SUCCESSFUL', data: { message: 'Serviço Atualizado com Sucesso!' } };
};

export default { findAllService, getAllService, UpdatePriceServiceByName };
