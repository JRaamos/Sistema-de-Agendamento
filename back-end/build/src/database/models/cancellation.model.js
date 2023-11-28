"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const user_model_1 = __importDefault(require("./user.model"));
const CancellationModel = index_1.default.define('Cancellation', {
    cancellationId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'cancellation_id',
    },
    dateCancellation: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        field: 'date_cancellation',
    },
    dateSchedule: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
            model: user_model_1.default,
            key: 'user_id',
        },
    },
    eventId: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        field: 'event_id',
    },
}, {
    tableName: 'cancellations',
    timestamps: false,
    underscored: true,
});
exports.default = CancellationModel;
