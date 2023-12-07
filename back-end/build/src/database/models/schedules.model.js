"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const user_model_1 = __importDefault(require("./user.model"));
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
    eventId: {
        type: sequelize_1.DataTypes.STRING(128),
        allowNull: false,
        field: 'event_id',
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: user_model_1.default,
            key: 'user_id',
        },
    },
}, {
    tableName: 'schedules',
    timestamps: false,
    underscored: true,
});
ScheduleModel.belongsTo(user_model_1.default, { foreignKey: 'userId', as: 'user' });
user_model_1.default.hasMany(ScheduleModel, { foreignKey: 'userId', as: 'schedules' });
exports.default = ScheduleModel;
