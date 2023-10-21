"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = __importDefault(require("../controllers/register.controller"));
const routerRegistre = (0, express_1.Router)();
routerRegistre.post('/registre', register_controller_1.default.CreateRegister);
exports.default = routerRegistre;
