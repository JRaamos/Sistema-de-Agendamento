"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const barberUser_controller_1 = __importDefault(require("../controllers/barberUser.controller"));
const routerLogin = (0, express_1.Router)();
routerLogin.post('/login', barberUser_controller_1.default.loginBarber);
exports.default = routerLogin;
