const db = require("../config/db");

exports.register = async (req) => {
  try {
    const { teacher, students } = req.body;

    // insert students into student table if they
    // don't exist, ignore the rest
    // con: auto_increment will increase
    const sql = `INSERT INTO student(email)
                 VALUES ?
                 ON DUPLICATE KEY UPDATE
                 email = email`;
    const values = students.map((student) => [student]);
    const result = await db.pool.query(sql, [values]);

    // get id of teacher
    const sql2 = `SELECT teacher_id FROM teacher WHERE email = ?`;
    const result2 = await db.pool.query(sql2, [teacher]);

    // add to class table
    const sql3 = `INSERT INTO class(teacher_id, student_id)
                    SELECT ?, student_id 
                    FROM student 
                    WHERE email IN (?)`;
    const result3 = await db.pool.query(sql3, [
      result2[0].teacher_id,
      students,
    ]);
  } catch (err) {
    throw err;
  }
};
