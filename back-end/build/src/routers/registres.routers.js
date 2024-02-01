"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = __importDefault(require("../controllers/register.controller"));
const registre_middlewares_1 = __importDefault(require("../middlewares/registre.middlewares"));
const routerRegistre = (0, express_1.Router)();
routerRegistre.post('/registre', registre_middlewares_1.default.validadeSchedule, registre_middlewares_1.default.validateService, registre_middlewares_1.default.validateUser, register_controller_1.default.CreateRegister);
exports.default = routerRegistre;
