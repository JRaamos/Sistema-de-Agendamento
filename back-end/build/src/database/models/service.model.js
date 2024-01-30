"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// ServiceModel.js
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const ServiceModel = index_1.default.define('Service', {
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    service: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.NUMBER,
        allowNull: false,
    },
}, {
    tableName: 'services',
    timestamps: false,
    underscored: true,
});
exports.default = ServiceModel;
