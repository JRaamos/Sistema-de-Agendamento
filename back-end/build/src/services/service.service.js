"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = __importDefault(require("../database/models/service.model"));
const priceService_1 = __importDefault(require("../utils/priceService"));
const createService = async (serviceData) => {
    const { services, userId } = serviceData;
    if (typeof services === 'string') {
        const price = (0, priceService_1.default)(services[0]);
        const serviceResult = await service_model_1.default.create({ services, price, userId });
        const { serviceId } = serviceResult.dataValues;
        return serviceId;
    }
    const serviceResult = services.map(async (service) => {
        const price = (0, priceService_1.default)(service);
        const result = await service_model_1.default.create({ services: service, price, userId });
        return result;
    });
    const { serviceId } = (await serviceResult[0]).dataValues;
    return serviceId;
};
exports.default = { createService };
