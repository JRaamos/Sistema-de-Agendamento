"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const service_model_1 = __importDefault(require("./service.model"));
const ScheduleModel = index_1.default.define('Schedule', {
    scheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'schedule_id',
    },
    date: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    hour: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    tableName: 'schedules',
    timestamps: false,
    underscored: true,
});
ScheduleModel.belongsToMany(service_model_1.default, {
    through: 'ScheduleServices',
    foreignKey: 'schedule_id',
});
exports.default = ScheduleModel;
