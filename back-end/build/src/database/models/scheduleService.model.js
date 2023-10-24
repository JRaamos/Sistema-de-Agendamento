"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const schedules_model_1 = __importDefault(require("./schedules.model"));
const service_model_1 = __importDefault(require("./service.model"));
const ScheduleServiceModel = index_1.default.define('ScheduleService', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    scheduleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'schedule_id',
        references: {
            model: schedules_model_1.default,
            key: 'schedule_id',
        },
    },
    serviceId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'service_id',
        references: {
            model: service_model_1.default,
            key: 'service_id',
        },
    },
}, {
    tableName: 'schedule_services',
    timestamps: false,
    underscored: true,
});
schedules_model_1.default.belongsToMany(service_model_1.default, {
    through: ScheduleServiceModel,
    foreignKey: 'schedule_id',
    otherKey: 'service_id',
    as: 'services',
});
exports.default = ScheduleServiceModel;
