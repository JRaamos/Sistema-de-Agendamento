"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dayOff_service_1 = __importDefault(require("../services/dayOff.service"));
const createDayOff = async (req, res) => {
    const dayOff = req.body;
    console.log(dayOff);
    await dayOff_service_1.default.createDayOff(dayOff);
    res.status(201).json('DayOff created');
};
const getDayOffs = async (req, res) => {
    const dayOffs = await dayOff_service_1.default.getDayOffs();
    res.status(200).json(dayOffs);
};
exports.default = {
    createDayOff,
    getDayOffs,
};
