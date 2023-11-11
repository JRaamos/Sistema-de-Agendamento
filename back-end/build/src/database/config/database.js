"use strict";
const config = {
    username: process.env.MYSQL_ADDON_USER,
    password: process.env.MYSQL_ADDON_PASSWORD,
    database: process.env.MYSQL_ADDON_DB,
    host: process.env.MYSQL_ADDON_HOST,
    port: Number(process.env.MYSQL_ADDON_PORT),
    dialect: 'mysql',
};
module.exports = config;
