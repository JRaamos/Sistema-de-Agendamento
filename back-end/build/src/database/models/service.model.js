"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const schedules_model_1 = __importDefault(require("./schedules.model"));
const scheduleService_model_1 = __importDefault(require("./scheduleService.model"));
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
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    duration: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
}, {
    tableName: 'services',
    timestamps: false,
    underscored: true,
});
ServiceModel.belongsToMany(schedules_model_1.default, {
    through: scheduleService_model_1.default,
    foreignKey: 'service_id',
    otherKey: 'schedule_id',
});
exports.default = ServiceModel;
