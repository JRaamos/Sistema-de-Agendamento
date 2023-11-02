"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const barberUser_model_1 = __importDefault(require("../database/models/barberUser.model"));
const jwt_utils_1 = __importDefault(require("../utils/jwt.utils"));
const loginBarber = async (email, password) => {
    const barber = await barberUser_model_1.default.findOne({
        where: { email },
    });
    if (!barber) {
        return { mensage: 'Email is incorrect' };
    }
    const isPasswordCorrect = bcryptjs_1.default.compareSync(password, barber === null || barber === void 0 ? void 0 : barber.dataValues.password);
    if (!isPasswordCorrect) {
        return { mensage: 'Password is incorrect' };
    }
    const token = jwt_utils_1.default.generetToken({ email, password });
    return { mensage: token };
};
exports.default = { loginBarber };
