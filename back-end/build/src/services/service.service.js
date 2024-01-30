"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_model_1 = __importDefault(require("../database/models/service.model"));
const notFound = 'Serviço não encontrado';
const findAllService = async (services) => {
    const serviceResults = await service_model_1.default.findAll({
        where: { service: services },
    });
    if (!serviceResults) {
        return {
            status: 'NOT_FOUND',
            data: { message: notFound },
        };
    }
    const serviceIds = services.map((service) => {
        const foundService = serviceResults.find((result) => result.dataValues.service === service);
        return foundService ? foundService.dataValues.serviceId : null;
    });
    const ids = serviceIds.filter((id) => id !== null);
    return { status: 'SUCCESSFUL', data: ids };
};
const getAllService = async () => {
    const serviceResult = await service_model_1.default.findAll();
    if (!serviceResult) {
        return {
            status: 'NOT_FOUND',
            data: { message: notFound },
        };
    }
    return { status: 'SUCCESSFUL', data: serviceResult };
};
const UpdatePriceServiceByName = async (name, service) => {
    const serviceResult = await service_model_1.default.update(service, {
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
exports.default = { findAllService, getAllService, UpdatePriceServiceByName };
