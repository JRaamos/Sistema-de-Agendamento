"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const cancellation_service_1 = __importDefault(require("../services/cancellation.service"));
const createCancellation = async (req, res) => {
    const { dateonly, hour } = req.body;
    const scheduleResult = await schedules_service_1.default.findByScheduleDateId(dateonly, hour);
    const now = new Date(Date.now());
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + brasiliaOffset * 60 * 1000);
    if (!scheduleResult) {
        return res.status(404).send('Schedule not found');
    }
    const { scheduleId, date, userId } = scheduleResult.dataValues;
    const newCancellation = {
        dateSchedule: date,
        dateCancellation: brasiliaTime,
        userId,
    };
    await cancellation_service_1.default.createCancellation(newCancellation);
    await schedules_service_1.default.deleteSchedule(scheduleId);
    return res.status(200).end();
};
const countCancellation = async (req, res) => {
    const { intervaloDias } = req.params;
    const result = await cancellation_service_1.default.countCancellation(Number(intervaloDias));
    return res.status(200).json({ result });
};
exports.default = { createCancellation, countCancellation };
