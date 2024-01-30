"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const service_service_1 = __importDefault(require("../services/service.service"));
const mapStatusHTTP_1 = __importDefault(require("../utils/mapStatusHTTP"));
const getAllService = async (req, res) => {
    const { data, status } = await service_service_1.default.getAllService();
    return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
};
const UpdatePriceServiceByName = async (req, res) => {
    const { name } = req.params;
    const formatName = name.split('-').join(' ');
    const { data, status } = await service_service_1.default.UpdatePriceServiceByName(formatName, req.body);
    return res.status((0, mapStatusHTTP_1.default)(status)).json(data);
};
exports.default = { getAllService, UpdatePriceServiceByName };
