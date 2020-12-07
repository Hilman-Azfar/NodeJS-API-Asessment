const db = require("../database");
const getMentionsAndText = require("../utility/getMentionsAndText");
const toLowerCaseEmail = require("../utility/toLowerCaseEmail");

/**
 * Register student(s) to one teacher
 * @param {string} teacher email@gmail.com
 * @param {string[]} students ['email@gmail.com']
 */

exports.register = async (teacher, students) => {
  try {
    teacher = toLowerCaseEmail(teacher);
    students = toLowerCaseEmail(students);
    const findTeacherSql = `SELECT teacher_id FROM teacher WHERE email = ?`;
    const teacherResult = await db.pool.query(findTeacherSql, [teacher]);

    const teacher_id = teacherResult[0]?.teacher_id;
    if (!teacher_id) {
      let err = new Error("Teacher does not exist");
      err.status = 404;
      throw err;
    }
    // insert students into student table if they
    // don't exist, ignore the rest
    // con: auto_increment will increase
    const insertStudentSql = `INSERT INTO student(email)
                 VALUES ?
                 ON DUPLICATE KEY UPDATE
                 email = email`;
    const studentsArray = students.map((student) => [student]);
    await db.pool.query(insertStudentSql, [studentsArray]);

    // add to class table
    // ignore the duplicates
    // insert valid
    const addClassSql = `INSERT IGNORE INTO class(teacher_id, student_id)
                    SELECT ?, student_id 
                    FROM student 
                    WHERE email IN (?)`;
    await db.pool.query(addClassSql, [teacher_id, students]);
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};

/**
 * @param {string|string[]} teacher email@gmail.com or ['email@gmail.com']
 * @returns {string[]} ['email@gmail.com']
 */

exports.commonStudents = async (teacher) => {
  try {
    teacher = toLowerCaseEmail(teacher);
    // due to query parser the query can be a string or an array
    // depending on user input
    // the sql value needs to be an array of arrays
    // to ensure the value is insert as ('a', 'b')
    if (typeof teacher === "string") {
      teacher = [teacher];
    }

    let sql = `SELECT DISTINCT s.email
                 FROM student s
                 INNER JOIN class c1
                    ON s.student_id = c1.student_id
                 INNER JOIN class c2
                    ON c1.student_id = c2.student_id
                 INNER JOIN teacher t
                    ON c1.teacher_id = t.teacher_id
                 WHERE c1.teacher_id IN (
                    SELECT teacher_id
                    FROM teacher
                    WHERE email IN (?)
                  )`;

    // check common among multiple teachers
    if (teacher.length > 1) {
      sql += "AND c1.teacher_id <> c2.teacher_id";
    }

    const value = [teacher];
    const email = await db.pool.query(sql, value);

    const students = email.map((item) => {
      return item.email;
    });

    return students;
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};

/**
 * @param {string} student email@gmail.com
 */

exports.suspendOne = async (student) => {
  try {
    student = toLowerCaseEmail(student);
    const sql = `UPDATE student
                 SET suspended = true
                 WHERE email = ?`;
    const value = [student];
    const result = await db.pool.query(sql, value);

    if (result.affectedRows === 0) {
      const err = new Error("Student not found");
      err.status = 404;
      throw err;
    }
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};

/**
 * @param {string} teacher
 * @param {string} notification
 * @returns {sting[]} recipients
 */

exports.retrieveForNotifications = async (teacher, notification) => {
  try {
    teacher = toLowerCaseEmail(teacher);
    // parse notification to check for mentions
    const parsedNotification = getMentionsAndText(notification);
    const [message, ...mentions] = parsedNotification;
    const mentionEmails = toLowerCaseEmail(mentions);

    const getTeacherIdSql = `SELECT teacher_id
                             FROM teacher 
                             where email = ?`;
    const result = await db.pool.query(getTeacherIdSql, [teacher]);
    const teacher_id = result[0]?.teacher_id;

    if (!teacher_id) {
      const err = new Error("Teacher not found...");
      err.status = 404;
      throw err;
    }

    let getRecipientsSql = `SELECT DISTINCT s.email
                              FROM student s
                              INNER JOIN class c
                                ON s.student_id = c.student_id
                                AND s.suspended = false
                              INNER JOIN teacher t
                                ON c.teacher_id = t.teacher_id
                              WHERE t.email = ?
                              `;
    if (mentionEmails.length > 0) {
      getRecipientsSql += "OR s.email in (?)";
    }

    const recipients = await db.pool.query(getRecipientsSql, [
      teacher,
      mentionEmails,
    ]);
    const recipientEmails = recipients.map((item) => item.email);

    return recipientEmails;
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};
