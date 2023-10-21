"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const createUserService = async (user) => {
    const { name, phone } = user;
    const userResult = await user_model_1.default.create({ name, phone });
    const { userId } = userResult.dataValues;
    return userId;
};
exports.default = { createUserService };