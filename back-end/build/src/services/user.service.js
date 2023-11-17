"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const userExists = async (phone, name) => {
    const user = await user_model_1.default.findOne({ where: { phone, name } });
    if (!user)
        return false;
    return user.dataValues.userId;
};
const createUserService = async (user) => {
    const { name, phone, deviceId } = user;
    const userExistsResult = await userExists(phone, name);
    if (userExistsResult)
        return userExistsResult;
    const userResult = await user_model_1.default.create({ name, phone, deviceId });
    const { userId } = userResult.dataValues;
    return userId;
};
const getUserService = async (userId) => {
    const user = await user_model_1.default.findByPk(userId);
    return user;
};
exports.default = { createUserService, getUserService };
