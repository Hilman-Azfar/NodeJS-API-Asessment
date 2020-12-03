const db = require("../config/db");
const faker = require("faker");

const seedTeachers = async () => {
  try {
    let promiseQuery = [];
    for (let i = 0; i < 5; i++) {
      let email = faker.internet.email();
      const sql = `INSERT INTO teacher(email) 
                   VALUES (?)`;
      promiseQuery.push(db.pool.query(sql, [email]));
    }
    const result = await Promise.all(promiseQuery);
    console.log(result[0], "-one");
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
  }
};

seed();
