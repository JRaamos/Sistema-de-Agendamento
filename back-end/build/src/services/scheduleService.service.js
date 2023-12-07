"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const scheduleService_model_1 = __importDefault(require("../database/models/scheduleService.model"));
const createScheduleService = async (scheduleId, serviceId) => {
    const scheduleServiceResult = await scheduleService_model_1.default.create({ scheduleId, serviceId });
    if (!scheduleServiceResult) {
        return {
            status: 'NOT_FOUND', data: { message: 'Serviço não encontrado' }
        };
    }
    return { status: 'SUCCESSFUL', data: scheduleServiceResult.dataValues.id };
};
exports.default = { createScheduleService };
