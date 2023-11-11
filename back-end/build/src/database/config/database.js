"use strict";
// import { Options } from 'sequelize';
const config = {
    username: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
    database: process.env.MYSQLDATABASE,
    host: process.env.MYSQLHOST,
    port: Number(process.env.MYSQLPORT),
    dialect: 'mysql',
};
module.exports = config;
