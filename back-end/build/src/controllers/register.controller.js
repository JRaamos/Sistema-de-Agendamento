"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const service_service_1 = __importDefault(require("../services/service.service"));
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const CreateRegister = async (req, res) => {
    const { name, phone, date, hour, services } = req.body;
    const user = await user_service_1.default.createUserService({ name, phone });
    const serviceIds = await service_service_1.default.createService({ services, userId: user });
    const scheduleData = {
        date,
        hour,
        userId: user,
        serviceId: serviceIds,
    };
    const scheduleResult = await schedules_service_1.default.createSchedule(scheduleData);
    return res.status(200).json({ user, serviceIds, scheduleResult });
};
exports.default = { CreateRegister };
