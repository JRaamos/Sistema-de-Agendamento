import ServiceModel from '../database/models/service.model';

const findAllService = async (services: string[]): Promise<number[]> => {
  const serviceResults = await ServiceModel.findAll({
    where: { service: services },
  });

  const serviceIds = services.map((service) => {
    const foundService = serviceResults.find((result) => result.dataValues.service === service);
    return foundService ? foundService.dataValues.serviceId : null;
  });

  return serviceIds.filter((id) => id !== null) as number[];
};

export default { findAllService };
