"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('users', {
            userId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'user_id',
            },
            name: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            phone: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            deviceId: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
                field: 'device_id',
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('users');
    }
};
