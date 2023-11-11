// import { Options } from 'sequelize';

// const config: Options = {
//   username: process.env.MYSQL_ADDON_USER,
//   password: process.env.MYSQL_ADDON_PASSWORD,
//   database: process.env.MYSQL_ADDON_DB,
//   host: process.env.MYSQL_ADDON_HOST,
//   port: Number(process.env.MYSQL_ADDON_PORT),
//   dialect: 'mysql',
// };

// export = config;
import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  host: process.env.MYSQLHOST,
  port: Number(process.env.MYSQLPORT),
  dialect: 'mysql',
};

export = config;