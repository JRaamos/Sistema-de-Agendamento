"use strict";
// import { Options } from 'sequelize';
const config = {
    username: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: process.env.MYSQL_DB_NAME || 'database',
    host: process.env.MYSQL_HOST || 'localhost',
    port: Number(process.env.MYSQLPORT),
    dialect: 'mysql',
};
module.exports = config;
