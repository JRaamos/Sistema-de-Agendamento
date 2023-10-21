import ServiceModel, { ServiceInputtableTypes } from '../database/models/service.model';

const createService = async (serviceData: ServiceInputtableTypes):
Promise<number> => {
  const { services, price, userId } = serviceData;
  if (typeof services === 'string') {
    const serviceResult = await ServiceModel.create({ services, price, userId });
    const { serviceId } = serviceResult.dataValues;
    return serviceId;
  }
  const serviceResult = services.map(async (service) => {
    const result = await ServiceModel.create({ services: service, price, userId });
    return result;
  });

  const { serviceId } = (await serviceResult[0]).dataValues;
  return serviceId;
};

export default { createService };
