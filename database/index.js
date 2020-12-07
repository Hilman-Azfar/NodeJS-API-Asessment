const { SqlPool } = require("../config/db");
const config = require("../config/env");

const db = new SqlPool(config.MYSQL);

module.exports = db;
