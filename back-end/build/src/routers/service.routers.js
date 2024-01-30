"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const service_controller_1 = __importDefault(require("../controllers/service.controller"));
const validateJWT_1 = __importDefault(require("../middlewares/validateJWT"));
const service_middlewraes_1 = __importDefault(require("../middlewares/service.middlewraes"));
const routerService = (0, express_1.Router)();
routerService.get('/services', service_controller_1.default.getAllService);
routerService.put('/service/:name', validateJWT_1.default, service_middlewraes_1.default, service_controller_1.default.UpdatePriceServiceByName);
exports.default = routerService;
