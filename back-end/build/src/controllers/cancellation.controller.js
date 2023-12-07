"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const cancellation_service_1 = __importDefault(require("../services/cancellation.service"));
const corn_node_1 = require("../utils/corn-node");
const createCancellation = async (req, res) => {
    const { dateonly, hour } = req.body;
    const scheduleResult = await schedules_service_1.default.findByScheduleDateId(dateonly, hour);
    const now = new Date(Date.now());
    const brasiliaOffset = -3 * 60;
    const brasiliaTime = new Date(now.getTime() + brasiliaOffset * 60 * 1000);
    if (!scheduleResult)
        return res.status(404).send('Schedule not found');
    const { scheduleId, date, userId, user, eventId } = scheduleResult.dataValues;
    const newCancellation = {
        dateSchedule: date,
        dateCancellation: brasiliaTime,
        userId,
        eventId,
    };
    await cancellation_service_1.default.createCancellation(newCancellation);
    if (user)
        await (0, corn_node_1.scheduleCancelation)(user.name, date, hour, user.deviceId);
    await schedules_service_1.default.deleteSchedule(scheduleId);
    return res.status(200).end();
};
const countCancellation = async (req, res) => {
    const { intervalDays } = req.params;
    const result = await cancellation_service_1.default.countCancellation(Number(intervalDays));
    return res.status(200).json({ result });
};
const getByCancellationDate = async (req, res) => {
    const { date } = req.params;
    const result = await cancellation_service_1.default.getByCancellationDate(date);
    return res.status(200).json({ result });
};
exports.default = { createCancellation, countCancellation, getByCancellationDate };
