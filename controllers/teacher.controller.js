const teacherModels = require("../models/teacher.model");

exports.register = async (req, res, next) => {
  try {
    req.accepts("application/json");
    const { teacher, students } = req.body;
    await teacherModels.register(teacher, students);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.commonStudents = async (req, res, next) => {
  try {
    let { teacher } = req.query;
    const students = await teacherModels.commonStudents(teacher);
    res.status(200);
    res.json({
      students,
    });
  } catch (err) {
    next(err);
  }
};

exports.suspend = async (req, res, next) => {
  try {
    req.accepts("application/json");
    const { student } = req.body;
    await teacherModels.suspendOne(student);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

exports.retrieveForNotifications = async (req, res, next) => {
  try {
    req.accepts("application/json");
    const { teacher, notification } = req.body;
    const recipients = await teacherModels.retrieveForNotifications(
      teacher,
      notification
    );
    res.status(200);
    res.json({
      recipients,
    });
  } catch (err) {
    next(err);
  }
};
