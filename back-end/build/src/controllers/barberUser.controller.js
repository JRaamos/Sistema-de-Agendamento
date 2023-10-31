"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const barberUser_service_1 = __importDefault(require("../services/barberUser.service"));
const loginBarber = async (req, res) => {
    const { email, password } = req.body;
    const result = await barberUser_service_1.default.loginBarber(email, password);
    return res.status(200).json(result);
};
exports.default = { loginBarber };
