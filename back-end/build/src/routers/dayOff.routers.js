"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dayOff_controller_1 = __importDefault(require("../controllers/dayOff.controller"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const routerDayOff = (0, express_1.Router)();
routerDayOff.get('/dayOff', dayOff_controller_1.default.getDayOffs);
routerDayOff.post('/dayOff', validateJWT_1.default, dayOff_controller_1.default.createDayOff);
routerDayOff.delete('/dayOff/:date', dayOff_controller_1.default.deleteDayOff);
exports.default = routerDayOff;
