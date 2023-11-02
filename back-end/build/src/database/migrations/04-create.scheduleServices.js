"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('schedule_services', {
            id: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
            },
            scheduleId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                field: 'schedule_id',
                references: {
                    model: 'schedules',
                    key: 'schedule_id',
                },
                onDelete: 'CASCADE',
            },
            serviceId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                field: 'service_id',
                references: {
                    model: 'services',
                    key: 'service_id',
                },
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('schedule_services');
    }
};
