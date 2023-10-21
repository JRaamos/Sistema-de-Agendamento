"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_model_1 = __importDefault(require("../database/models/schedules.model"));
const createSchedule = async (schedule) => {
    const { date, hour, userId, serviceId } = schedule;
    if (!date || !hour || !userId || !serviceId) {
        return {
            status: 'INVALID_DATA',
            data: { message: 'Date, hour, userId and serviceId are required' },
        };
    }
    const scheduleResult = await schedules_model_1.default.create({ date, hour, userId, serviceId });
    return { status: 'SUCCESSFUL', data: scheduleResult.dataValues };
};
exports.default = { createSchedule };
