"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = __importDefault(require("sequelize"));
const cancellation_model_1 = __importDefault(require("../database/models/cancellation.model"));
const createCancellation = async (cancellation) => {
    await cancellation_model_1.default.create(cancellation);
};
const countCancellation = async (rageDays) => {
    const dateStart = new Date();
    dateStart.setDate(dateStart.getDate() - rageDays);
    const result = await cancellation_model_1.default.count({
        where: {
            dateSchedule: {
                [sequelize_1.default.Op.gte]: dateStart,
            },
        },
    });
    return result;
};
exports.default = { createCancellation, countCancellation };
