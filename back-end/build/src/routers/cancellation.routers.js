"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cancellation_controller_1 = __importDefault(require("../controllers/cancellation.controller"));
const routerCancellation = (0, express_1.Router)();
routerCancellation.post('/cancellation', cancellation_controller_1.default.createCancellation);
routerCancellation.get('/cancellation/:intervaloDias', cancellation_controller_1.default.countCancellation);
exports.default = routerCancellation;
