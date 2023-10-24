"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_model_1 = __importDefault(require("../database/models/schedules.model"));
const createSchedule = async (schedule) => {
    const { date, hour, userId } = schedule;
    const scheduleResult = await schedules_model_1.default.create({ date, hour, userId });
    return scheduleResult.dataValues;
};
const finaAllSchedulesDate = async (date) => {
    const scheduleResult = await schedules_model_1.default.findAll({ where: { date } });
    return scheduleResult.map((schedule) => schedule.dataValues);
};
exports.default = { createSchedule, finaAllSchedulesDate };
