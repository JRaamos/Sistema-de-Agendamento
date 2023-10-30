"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_model_1 = __importDefault(require("../database/models/schedules.model"));
const service_model_1 = __importDefault(require("../database/models/service.model"));
const createSchedule = async (schedule) => {
    const { date, hour, userId } = schedule;
    const scheduleResult = await schedules_model_1.default.create({ date, hour, userId });
    return scheduleResult.dataValues;
};
const finaAllSchedulesDate = async (date) => {
    const schedulesWithServices = await schedules_model_1.default.findAll({
        where: { date },
        include: {
            model: service_model_1.default,
            as: 'services',
            attributes: ['service', 'price', 'duration'],
            through: { attributes: [] },
        },
    });
    return schedulesWithServices;
};
const findByScheduleDateId = async (date, hour) => {
    const schedulesWithServices = await schedules_model_1.default.findOne({
        where: { date, hour },
        include: {
            model: service_model_1.default,
            as: 'services',
            attributes: ['service', 'price', 'duration'],
            through: { attributes: [] },
        },
    });
    return schedulesWithServices;
};
const deleteSchedule = async (scheduleId) => {
    await schedules_model_1.default.destroy({ where: { scheduleId } });
};
exports.default = { createSchedule, finaAllSchedulesDate, findByScheduleDateId, deleteSchedule };
