"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = __importDefault(require("../database/models/service.model"));
const createService = async (serviceData) => {
    const { services, price, userId } = serviceData;
    if (typeof services === 'string') {
        const serviceResult = await service_model_1.default.create({ services, price, userId });
        const { serviceId } = serviceResult.dataValues;
        return serviceId;
    }
    const serviceResult = services.map(async (service) => {
        const result = await service_model_1.default.create({ services: service, price, userId });
        return result;
    });
    const { serviceId } = (await serviceResult[0]).dataValues;
    return serviceId;
};
exports.default = { createService };
