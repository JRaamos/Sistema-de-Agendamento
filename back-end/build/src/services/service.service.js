"use strict";
// import ServiceModel, { ServiceInputtableTypes } from '../database/models/service.model';
// import getPrice from '../utils/priceService';
// const createService = async (serviceData: ServiceInputtableTypes):
// Promise<number> => {
//   const { services, userId } = serviceData;
//   if (typeof services === 'string') {
//     const price = getPrice(services[0]);
//     const serviceResult = await ServiceModel.create({ services, price, userId });
//     const { serviceId } = serviceResult.dataValues;
//     return serviceId;
//   }
//   const serviceResult = services.map(async (service) => {
//     const price = getPrice(service);
//     const result = await ServiceModel.create({ services: service, price, userId });
//     return result;
//   });
//   const { serviceId } = (await serviceResult[0]).dataValues;
//   return serviceId;
// };
// export default { createService };
