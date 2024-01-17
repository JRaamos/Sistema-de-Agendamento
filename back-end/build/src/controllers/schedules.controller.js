"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const finaAllSchedulesDate = async (req, res) => {
    const { date } = req.params;
    const scheduleResult = await schedules_service_1.default.finaAllSchedulesDate(date);
    return res.status(200).json(scheduleResult);
};
const findByScheduleDateId = async (req, res) => {
    const { date, hour } = req.params;
    const scheduleResult = await schedules_service_1.default.findByScheduleDateId(date, hour);
    return res.status(200).json(scheduleResult);
};
const countSchedules = async (req, res) => {
    const { intervalDays } = req.params;
    const result = await schedules_service_1.default.countSchedules(Number(intervalDays));
    return res.status(200).json({ result });
};
const countFutureSchedules = async (req, res) => {
    const result = await schedules_service_1.default.countFutureSchedules();
    return res.status(200).json({ result });
};
const findAllSchedulesFromNow = async (req, res) => {
    const result = await schedules_service_1.default.findAllSchedulesFromNow();
    return res.status(200).json(result.data);
};
exports.default = {
    finaAllSchedulesDate,
    findByScheduleDateId,
    countSchedules,
    countFutureSchedules,
    findAllSchedulesFromNow,
};
