"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('schedules', {
            scheduleId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'schedule_id',
            },
            date: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
            },
            hour: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            eventId: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
                field: 'event_id',
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                field: 'user_id',
                references: {
                    model: 'users',
                    key: 'user_id',
                },
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('schedules');
    }
};
