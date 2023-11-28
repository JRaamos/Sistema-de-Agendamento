"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable("cancellations", {
            cancellationId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: "cancellation_id",
            },
            dateSchedule: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                field: "date_schedule",
            },
            dateCancellation: {
                type: sequelize_1.DataTypes.DATEONLY,
                allowNull: false,
                field: "date_cancellation",
            },
            userId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                allowNull: false,
                field: "user_id",
                references: {
                    model: "users",
                    key: "user_id",
                },
            },
            eventId: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: false,
                field: "event_id",
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable("cancellations");
    },
};
