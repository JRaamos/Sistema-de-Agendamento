"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = {
    up(queryInterface) {
        return queryInterface.createTable('services', {
            serviceId: {
                type: sequelize_1.DataTypes.INTEGER.UNSIGNED,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                field: 'service_id',
            },
            service: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            },
            duration: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
            }
        });
    },
    down(queryInterface) {
        return queryInterface.dropTable('services');
    }
};
