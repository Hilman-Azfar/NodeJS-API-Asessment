const db = require("../config/db");
const getMentionsAndText = require("../utility/getMentionsAndText");

exports.register = async (teacher, students) => {
  try {
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
    const addClassSql = `INSERT INTO class(teacher_id, student_id)
                    SELECT ?, student_id 
                    FROM student 
                    WHERE email IN (?)`;
    await db.pool.query(addClassSql, [teacher_id, students]);
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};

exports.commonStudents = async (teacher) => {
  try {
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

    // this line needed to check if the student is registered
    // to all the queried teachers
    if (teacher.length > 1) {
      sql += "AND c1.teacher_id <> c2.teacher_id";
    }

    const value = [teacher];
    const email = await db.pool.query(sql, value);

    const emailArray = email.map((item) => {
      return item.email;
    });

    return emailArray;
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};

exports.suspendOne = async (student) => {
  try {
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

exports.retrieveForNotifications = async (data) => {
  try {
    // parse notification to check for mentions

    const { teacher, notification } = data;
    const parsedNotification = getMentionsAndText(notification);
    const [message, ...mentions] = parsedNotification;

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
    // insert notification, get id
    // get all the recipients email to respond and add to
    // notification group

    // const sql = `INSERT INTO notification (sender_id, message)
    //              VALUES (
    //                (SELECT teacher_id FROM teacher
    //                 WHERE email = ?),
    //                ?
    //               )`;
    // const result = await db.pool.query(sql, [teacher, message]);
    // const notification_id = result.insertId;

    let getRecipientsSql = `SELECT s.email
                              FROM student s
                              INNER JOIN class c
                                ON s.student_id = c.student_id
                                AND s.suspended = false
                              INNER JOIN teacher t
                                ON c.teacher_id = t.teacher_id
                              WHERE t.email = ?
                              `;
    if (mentions.length > 0) {
      getRecipientsSql += "OR s.email in (?)";
    }

    const result2 = await db.pool.query(getRecipientsSql, [teacher, mentions]);
    const recipients = result2.map((item) => item.email);

    // const notificationGroupSql = `INSERT INTO notification_group(notification_id, recipient_id)
    //                                 SELECT ?, student_id
    //                                 FROM student
    //                                 WHERE email in (?)`;
    // const result3 = await db.pool.query(notificationGroupSql, [
    //   notification_id,
    //   recipients,
    // ]);
    return recipients;
  } catch (err) {
    err.status = err.status || 500;
    throw err;
  }
};
