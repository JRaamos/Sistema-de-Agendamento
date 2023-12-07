"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const schedules_model_1 = __importDefault(require("../database/models/schedules.model"));
const service_model_1 = __importDefault(require("../database/models/service.model"));
const user_model_1 = __importDefault(require("../database/models/user.model"));
const now = moment_timezone_1.default.tz('America/Sao_Paulo');
const currentDate = now.format('YYYY-MM-DD');
const createSchedule = async (schedule) => {
    const { date, hour, userId, eventId } = schedule;
    const scheduleResult = await schedules_model_1.default.create({ date, hour, userId, eventId });
    if (!scheduleResult) {
        return {
            status: 'NOT_FOUND', data: { message: 'dados invalidos' },
        };
    }
    return { status: 'SUCCESSFUL', data: scheduleResult.dataValues };
};
const finaAllSchedulesDate = async (date) => {
    const schedulesWithServicesAndUsers = await schedules_model_1.default.findAll({
        where: { date },
        include: [
            {
                model: service_model_1.default,
                as: 'services',
                attributes: ['service', 'price', 'duration'],
                through: { attributes: [] },
            },
            {
                model: user_model_1.default,
                as: 'user',
                attributes: ['name', 'phone', 'deviceId'],
            },
        ],
    });
    if (!schedulesWithServicesAndUsers) {
        return {
            status: 'NOT_FOUND', data: { message: 'Agendamento não encontrado' },
        };
    }
    return { status: 'SUCCESSFUL',
        data: schedulesWithServicesAndUsers,
    };
};
const findAllSchedulesFromNow = async () => {
    const currentTime = now.format('HH:mm:ss');
    const schedules = await schedules_model_1.default.findAll({
        where: {
            [sequelize_1.Op.and]: [
                { date: { [sequelize_1.Op.gt]: currentDate } },
                {
                    [sequelize_1.Op.or]: [{
                            [sequelize_1.Op.and]: [
                                { date: currentDate },
                                { hour: { [sequelize_1.Op.gte]: currentTime } },
                            ],
                        },
                        { date: { [sequelize_1.Op.gt]: currentDate } },
                    ],
                }
            ],
        },
        include: [{
                model: service_model_1.default,
                as: 'services',
                attributes: ['service', 'price', 'duration'],
                through: { attributes: [] },
            },
            {
                model: user_model_1.default,
                as: 'user',
                attributes: ['name', 'phone', 'deviceId'],
            }],
        order: [['date', 'ASC'], ['hour', 'ASC'],
        ],
    });
    if (!schedules) {
        return {
            status: 'NOT_FOUND', data: { message: 'Agendamento não encontrado' },
        };
    }
    return { status: 'SUCCESSFUL', data: schedules };
};
const findByScheduleDateId = async (date, hour) => {
    const schedulesWithServices = await schedules_model_1.default.findOne({
        where: { date, hour },
        include: [{
                model: service_model_1.default,
                as: 'services',
                attributes: ['service', 'price', 'duration'],
                through: { attributes: [] },
            },
            {
                model: user_model_1.default,
                as: 'user',
                attributes: ['name', 'phone', 'deviceId'],
            },
        ],
    });
    return schedulesWithServices;
};
const deleteSchedule = async (scheduleId) => {
    await schedules_model_1.default.destroy({ where: { scheduleId } });
};
const countSchedules = async (rangeDays) => {
    const endTime = now.format('HH:mm:ss');
    let startDate = now.clone().subtract(rangeDays, 'days').format('YYYY-MM-DD');
    if (rangeDays <= 0) {
        startDate = '1970-01-01';
    }
    const result = await schedules_model_1.default.count({
        where: {
            [sequelize_1.Op.and]: [
                { date: { [sequelize_1.Op.gte]: startDate } },
                { date: { [sequelize_1.Op.lte]: currentDate } },
                {
                    [sequelize_1.Op.or]: [
                        {
                            date: {
                                [sequelize_1.Op.lt]: currentDate,
                            },
                        },
                        {
                            [sequelize_1.Op.and]: [
                                { date: currentDate },
                                { hour: { [sequelize_1.Op.lte]: endTime } },
                            ],
                        },
                    ],
                },
            ],
        },
    });
    return result;
};
const countFutureSchedules = async () => {
    const currentTime = now.format('HH:mm:ss');
    const result = await schedules_model_1.default.count({
        where: {
            date: {
                [sequelize_1.Op.gte]: currentDate,
            },
            [sequelize_1.Op.or]: [
                {
                    date: {
                        [sequelize_1.Op.gt]: currentDate,
                    },
                },
                {
                    [sequelize_1.Op.and]: [
                        { date: currentDate },
                        { hour: { [sequelize_1.Op.gt]: currentTime } },
                    ],
                },
            ],
        },
    });
    return result;
};
exports.default = {
    countFutureSchedules,
    createSchedule,
    finaAllSchedulesDate,
    findByScheduleDateId,
    deleteSchedule,
    countSchedules,
    findAllSchedulesFromNow,
};
