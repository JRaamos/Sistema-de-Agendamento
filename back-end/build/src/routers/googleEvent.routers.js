"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const googleEvent_controller_1 = __importDefault(require("../controllers/googleEvent.controller"));
const routerGoogleEvent = (0, express_1.Router)();
routerGoogleEvent.post('/googleEvent', googleEvent_controller_1.default.createEvent);
routerGoogleEvent.delete('/googleEvent/:eventId', googleEvent_controller_1.default.deleteEvent);
exports.default = routerGoogleEvent;
