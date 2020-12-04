const db = require("../config/db");
const getMentionsAndText = require("../utility/getMentionsAndText");

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

exports.commonStudents = async (teacher) => {
  try {
    // due to query parser the query can be a string or an array
    // depending on user input
    // the sql value needs to be an array of arrays
    // to ensure the value is insert as ('a', 'b')
    if (typeof teacher === "string") {
      teacher = [teacher];
    }
    // const sql = `SELECT DISTINCT s.email
    //              FROM student s
    //              INNER JOIN class c
    //                 ON c.student_id = s.student_id
    //              WHERE
    //                 c.teacher_id IN (
    //                   SELECT teacher_id
    //                   FROM teacher
    //                   WHERE email IN (?)
    //                 )`;
    // const sql = `SELECT DISTINCT s.email
    //              FROM student s
    //              INNER JOIN class a
    //                 ON s.student_id = a.student_id
    //              INNER JOIN class b
    //                 ON a.student_id = b.student_id
    //              INNER JOIN
    //              WHERE a.teacher_id > b.teacher_id`;

    const sql = `SELECT DISTINCT s.email
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
                 AND c1.teacher_id <> c2.teacher_id
                  )`;
    const value = [teacher];
    const result = await db.pool.query(sql, value);

    const resultArray = result.map((item) => {
      return item.email;
    });

    return resultArray;
  } catch (err) {
    throw err;
  }
};

exports.suspendOne = async (student) => {
  try {
    const sql = `UPDATE student
                 SET suspended = true
                 WHERE email = ?`;
    const value = [student];
    await db.pool.query(sql, value);
  } catch (err) {
    throw err;
  }
};

exports.retrieveForNotifications = async (data) => {
  try {
    // parse notification to check for mentions
    // create notification
    // create notification_group for all students of teacher and
    // mentions

    const { teacher, notification } = data;
    const parsedNotification = getMentionsAndText(notification);
    const [message, ...mentions] = parsedNotification;

    // insert notification, get id
    // get all the recipients email to respond and add to
    // notification group

    const sql = `INSERT INTO notification (sender_id, message)
                 VALUES ( 
                   (SELECT teacher_id FROM teacher
                    WHERE email = ?), 
                   ?
                  )`;
    const result = await db.pool.query(sql, [teacher, message]);
    const notification_id = result.insertId;

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

    const notificationGroupSql = `INSERT INTO notification_group(notification_id, recipient_id)
                                    SELECT ?, student_id
                                    FROM student
                                    WHERE email in (?)`;
    const result3 = await db.pool.query(notificationGroupSql, [
      notification_id,
      recipients,
    ]);

    console.log(recipients);
    console.log(result3);
    return recipients;
  } catch (err) {
    throw err;
  }
};
