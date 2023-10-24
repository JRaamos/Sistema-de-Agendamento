"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = __importDefault(require("../database/models/service.model"));
const findAllService = async (services) => {
    const serviceResults = await service_model_1.default.findAll({
        where: { service: services },
    });
    const serviceIds = services.map((service) => {
        const foundService = serviceResults.find((result) => result.dataValues.service === service);
        return foundService ? foundService.dataValues.serviceId : null;
    });
    return serviceIds.filter((id) => id !== null);
};
exports.default = { findAllService };
