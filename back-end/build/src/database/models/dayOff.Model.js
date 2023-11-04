"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_1 = __importDefault(require("./index"));
const DayOffModel = index_1.default.define('DayOff', {
    dayOffId: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
        field: 'day_off_id',
    },
    barberId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        field: 'barber_id',
    },
    dayOff: {
        type: sequelize_1.DataTypes.DATEONLY,
        allowNull: false,
        field: 'day_off',
    },
    time: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'day_off',
    timestamps: false,
    underscored: true,
});
exports.default = DayOffModel;
