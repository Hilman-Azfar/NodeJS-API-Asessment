const db = require("../database");
const model = require("../models/teacher.model");

const seedTeachers = async () => {
  try {
    const sql = `INSERT INTO teacher(email) 
                 VALUES (?)`;
    const values = ["teacherken@gmail.com", "teacherjoe@gmail.com"];
    await db.pool.query(sql, values);
  } catch (err) {
    console.error(err);
  }
};

const seed = async () => {
  try {
    if (db.pool === null) {
      await db.initialize();
    }
    await seedTeachers();
  } catch (err) {
    console.error(err);
  } finally {
    db.pool.end();
    process.exit(0);
  }
};

seed();
