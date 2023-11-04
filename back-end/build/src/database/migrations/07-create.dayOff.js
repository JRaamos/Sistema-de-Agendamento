"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('day_off', {
            dayOffId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
            },
            barberId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            dayOff: {
                type: sequelize_1.DataTypes.STRING(50),
                field: 'day_off',
            },
            time: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('day_off');
    }
};
