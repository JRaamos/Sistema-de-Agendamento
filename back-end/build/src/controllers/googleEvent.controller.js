"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const googleEvent_service_1 = __importDefault(require("../services/googleEvent.service"));
const formatGoogleEvent_1 = __importDefault(require("../utils/formatGoogleEvent"));
const createEvent = async (req, res) => {
    const transformsEvent = await (0, formatGoogleEvent_1.default)(req.body);
    const event = await googleEvent_service_1.default.createEventService(transformsEvent);
    return res.status(200).json({ message: 'Evento criado com sucesso!', event });
};
const deleteEvent = async (req, res) => {
    const { eventId } = req.params;
    const event = await googleEvent_service_1.default.deleteEventService(eventId);
    return res.status(200).json({ message: 'Evento deletado com sucesso!', event });
};
exports.default = { createEvent, deleteEvent };
