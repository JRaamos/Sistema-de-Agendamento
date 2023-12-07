"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = __importDefault(require("../database/models/user.model"));
const userExists = async (phone, name, deviceId) => {
    const user = await user_model_1.default.findOne({ where: { phone, name } });
    if (!user)
        return false;
    user_model_1.default.update({ deviceId }, { where: { phone, name } });
    return user.dataValues.userId;
};
const createUserService = async (user) => {
    const { name, phone, deviceId } = user;
    const userExistsResult = await userExists(phone, name, deviceId);
    if (userExistsResult)
        return { status: 'SUCCESSFUL', data: userExistsResult };
    const userResult = await user_model_1.default.create({ name, phone, deviceId });
    if (!userResult) {
        return {
            status: 'INVALID_DATA', data: { message: 'invalid data' },
        };
    }
    const { userId } = userResult.dataValues;
    return { status: 'SUCCESSFUL', data: userId };
};
const getUserService = async (userId) => {
    const user = await user_model_1.default.findByPk(userId);
    if (!user)
        return { status: 'NOT_FOUND', data: { message: 'User not found' } };
    return { status: 'SUCCESSFUL', data: user };
};
exports.default = { createUserService, getUserService };
