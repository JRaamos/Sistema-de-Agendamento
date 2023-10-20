"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('schedule', {
            scheduleId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            date: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: false,
            },
            hour: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'userId',
                },
            },
            serviceId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                references: {
                    model: 'services',
                    key: 'serviceId',
                },
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('users');
    }
};
