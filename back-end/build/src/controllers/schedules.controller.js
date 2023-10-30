"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const finaAllSchedulesDate = async (req, res) => {
    const { date } = req.body;
    const scheduleResult = await schedules_service_1.default.finaAllSchedulesDate(date);
    return res.status(200).json(scheduleResult);
};
const findByScheduleDateId = async (req, res) => {
    const { date, hour } = req.body;
    const scheduleResult = await schedules_service_1.default.findByScheduleDateId(date, hour);
    return res.status(200).json(scheduleResult);
};
exports.default = { finaAllSchedulesDate, findByScheduleDateId };
