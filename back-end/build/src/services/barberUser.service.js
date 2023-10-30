"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const barberUser_model_1 = __importDefault(require("../database/models/barberUser.model"));
const loginBarber = async (email, password) => {
    const passwordEncrypted = bcryptjs_1.default.hashSync(password, 10);
    const barber = await barberUser_model_1.default.findOne({
        where: {
            email,
            password: passwordEncrypted,
        },
    });
    return barber;
};
exports.default = { loginBarber };
