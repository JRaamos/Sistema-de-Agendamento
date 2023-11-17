"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const UserModel = _1.default.define('User', {
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'user_id',
    },
    name: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    phone: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    deviceId: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: true,
        field: 'device_id',
    },
}, {
    tableName: 'users',
    timestamps: false,
    underscored: true,
});
exports.default = UserModel;
