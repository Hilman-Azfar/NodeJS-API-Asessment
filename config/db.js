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

  initialize: async function () {
    try {
      // create a pool of connection with no database context
      // idea is the mysql server might not have the database we need
      // so we have to create one and reconnect with a new pool

      let pool = await mysql.createPool(options);
      // promisify for Node.js async/await
      pool.query = util.promisify(pool.query);

      // create database if doesnt exist
      let dbsql = `CREATE DATABASE IF NOT EXISTS ??`;
      dbsql = mysql.format(dbsql, [config.MYSQL.database]);
      await pool.query(dbsql);
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

      // max row size is 65 535 bytes
      // 10000 char limit is approx 1600 words
      // default is latin1, change to utf8 to store
      // multiple languages
      const notificationTable = `CREATE TABLE IF NOT EXISTS notification(
          notification_id INT AUTO_INCREMENT PRIMARY KEY,
          sender_id INT NOT NULL,
          message VARCHAR(10000) NOT NULL,
          FOREIGN KEY(sender_id)
              REFERENCES teacher(teacher_id)
              ON DELETE CASCADE
      ) CHARACTER SET 'utf8'`;
      await pool.query(notificationTable);

      const notificationGroupTable = `CREATE TABLE IF NOT EXISTS notification_group(
        notification_group_id INT AUTO_INCREMENT PRIMARY KEY,
        recipient_id INT NOT NULL,
        notification_id INT NOT NULL,
        FOREIGN KEY(recipient_id)
          REFERENCES student(student_id)
          ON DELETE CASCADE,
        FOREIGN KEY(notification_id)
          REFERENCES notification(notification_id)
          ON DELETE CASCADE
      )`;
      await pool.query(notificationGroupTable);

      logger.info("db connected");
      this.pool = pool;
    } catch (err) {
      throw err;
    }
  },
};

module.exports = db;
