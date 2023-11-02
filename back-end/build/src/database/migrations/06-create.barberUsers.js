"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('barber_users', {
            barberId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'barber_id',
            },
            name: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
            },
            email: {
                type: sequelize_1.DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('barber_users');
    }
};
