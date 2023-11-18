"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const schedules_service_1 = __importDefault(require("../services/schedules.service"));
const service_service_1 = __importDefault(require("../services/service.service"));
const scheduleService_service_1 = __importDefault(require("../services/scheduleService.service"));
const CreateRegister = async (req, res) => {
    const { name, phone, date, hour, services, eventId, deviceId } = req.body;
    const user = await user_service_1.default.createUserService({ name, phone, deviceId });
    const servicesIds = await service_service_1.default.findAllService(services);
    const scheduleData = {
        date,
        hour,
        userId: user,
        eventId,
    };
    const scheduleResult = await schedules_service_1.default.createSchedule(scheduleData);
    servicesIds.forEach(async (serviceId) => {
        await scheduleService_service_1.default.createScheduleService(scheduleResult.scheduleId, serviceId);
    });
    return res.status(200).json({ user, scheduleResult });
};
exports.default = { CreateRegister };
