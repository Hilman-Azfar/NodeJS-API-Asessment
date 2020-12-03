require("dotenv").config();

module.exports = {
  DEBUG: process.env.DEBUG,
  NODE_ENV: process.env.NODE_ENV,
  MYSQL: {
    host: process.env.HOST,
    port: process.env.DBPORT,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
  },
};
