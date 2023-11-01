"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const schedules_controller_1 = __importDefault(require("../controllers/schedules.controller"));
const routerSchedules = (0, express_1.Router)();
routerSchedules.get('/schedules/:date', schedules_controller_1.default.finaAllSchedulesDate);
routerSchedules.get('/schedules/:date/:hour', schedules_controller_1.default.findByScheduleDateId);
routerSchedules.get('/schedules/:intervalDays', schedules_controller_1.default.countSchedules);
exports.default = routerSchedules;
