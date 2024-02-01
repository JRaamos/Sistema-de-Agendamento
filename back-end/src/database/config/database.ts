import { Options } from 'sequelize';

const config: Options = {
  username: process.env.MYSQL_ADDON_USER,
  password: process.env.MYSQL_ADDON_PASSWORD,
  database: process.env.MYSQL_ADDON_DB,
  host: process.env.MYSQL_ADDON_HOST,
  port: Number(process.env.MYSQL_ADDON_PORT),
  dialect: 'mysql',
};

export = config;

// import { Options } from 'sequelize';

// const config: Options = {
//   username: process.env.MYSQL_USER || 'root',
//   password: process.env.MYSQL_PASSWORD || 'password',
//   database: process.env.MYSQL_DB_NAME || 'database',
//   host: process.env.MYSQL_HOST || 'localhost',
//   port: Number(process.env.MYSQLPORT),
//   dialect: 'mysql',
// };

// export = config;