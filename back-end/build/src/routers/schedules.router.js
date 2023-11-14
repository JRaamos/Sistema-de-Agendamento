"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controller_1 = __importDefault(require("../controllers/schedules.controller"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const routerSchedules = (0, express_1.Router)();
routerSchedules.get('/schedules', schedules_controller_1.default.findAllSchedulesFromNow);
routerSchedules.get('/schedules/date/:date', schedules_controller_1.default.finaAllSchedulesDate);
routerSchedules.get('/schedules/date/:date/hour/:hour', schedules_controller_1.default.findByScheduleDateId);
routerSchedules.get('/schedules/count/future', validateJWT_1.default, schedules_controller_1.default.countFutureSchedules);
routerSchedules.get('/schedules/count/:intervalDays', validateJWT_1.default, schedules_controller_1.default.countSchedules);
exports.default = routerSchedules;
