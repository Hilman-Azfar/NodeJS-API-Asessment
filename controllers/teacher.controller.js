const teacherModels = require("../models/teacher.model");

exports.register = async (req, res, next) => {
  try {
    await teacherModels.register(req);
    res.sendStatus(204);
  } catch (err) {
    err.status = 404;
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
    err.status = 404;
    next(err);
  }
};

exports.suspend = async (req, res, next) => {
  try {
    const { student } = req.body;
    await teacherModels.suspendOne(student);
    res.sendStatus(204);
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.retrieveForNotifications = async (req, res, next) => {
  try {
    const recipients = await teacherModels.retrieveForNotifications(req.body);
    res.status(200);
    res.json({
      recipients,
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
