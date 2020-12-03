const mysql = require("mysql");
const config = require("./env");
const util = require("util");
const logger = require("./logger");

// create a connection pool of 10
// so i dont have to manually end every connection
const { user, password, host, port, database } = config.MYSQL;
const options = {
  host,
  user,
  password,
  connectionLimit: 10,
};

const db = {
  pool: null,

  reconnect: function () {},

  initialize: async function () {
    try {
      // create a pool of connection with no database context
      // idea is the mysql server might not have the database we need
      // so we have to create one and reconnect with a new pool

      let pool = await mysql.createPool(options);
      // promisify for Node.js async/await
      pool.query = util.promisify(pool.query);

      // create database if doesnt exist
      // sql injection not possible because multiple statements are disabled
      const dbsql = `CREATE DATABASE IF NOT EXISTS ${config.MYSQL.database}`;
      const dbResult = await pool.query(dbsql);

      await pool.end();

      // reestablish pool with database
      pool = await mysql.createConnection({ ...options, database });
      pool.query = util.promisify(pool.query);

      // create table if doesnt exist
      const teacherTable = `CREATE TABLE IF NOT EXISTS teacher (
        teacher_id INT AUTO_INCREMENT PRIMARY KEY, 
        email VARCHAR(255) NOT NULL UNIQUE
        )`;
      await pool.query(teacherTable);

      const studentTable = `CREATE TABLE IF NOT EXISTS student(
        student_id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255) NOT NULL UNIQUE,
        suspended BOOLEAN DEFAULT FALSE
      )`;
      await pool.query(studentTable);

      const classTable = `CREATE TABLE IF NOT EXISTS class(
        teacher_id INT,
        student_id INT,
        PRIMARY KEY(teacher_id,student_id),
        FOREIGN KEY(teacher_id)
            REFERENCES teacher(teacher_id)
            ON DELETE CASCADE,
        FOREIGN KEY(student_id)
            REFERENCES student(student_id)
            ON DELETE CASCADE
      )`;
      await pool.query(classTable);

      logger.info("db connected");
      this.pool = pool;
    } catch (err) {
      //retry or throw service unavailable
      console.log(err);
      logger.error(err);
    }
  },
};

db.initialize();

module.exports = db;
