"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const cancellation_model_1 = __importDefault(require("../database/models/cancellation.model"));
const createCancellation = async (cancellation) => {
    await cancellation_model_1.default.create(cancellation);
};
const countCancellation = async (rageDays) => {
    const now = moment_timezone_1.default.tz('America/Sao_Paulo');
    const currentDate = now.format('YYYY-MM-DD');
    const currentTime = now.format('HH:mm:ss');
    let dateStart = new Date(`${currentDate} ${currentTime}`);
    if (rageDays > 0) {
        dateStart = now.subtract(rageDays, 'days').toDate();
    }
    else {
        dateStart = new Date('1970-01-01');
    }
    dateStart.setHours(0, 0, 0, 0);
    const result = await cancellation_model_1.default.count({
        where: {
            dateCancellation: {
                [sequelize_1.default.Op.between]: [dateStart, `${currentDate} ${currentTime}`],
            },
        },
    });
    return result;
};
const getByCancellationDate = async (date) => {
    const [year, month, day] = date.split('-');
    const dateStart = new Date(`${year}-${month}-${day} 00:00:00`);
    const result = await cancellation_model_1.default.findOne({
        where: {
            dateSchedule: dateStart,
        },
    });
    return result;
};
exports.default = { createCancellation, countCancellation, getByCancellationDate };
