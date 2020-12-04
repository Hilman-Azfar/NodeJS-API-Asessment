const teacherModels = require("../models/teacher.model");

exports.register = async (req, res, next) => {
  try {
    await teacherModels.register(req);
    res.json({
      success: true,
      message: "register",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.commonStudents = async (req, res, next) => {
  try {
    let { teacher } = req.query;
    const students = await teacherModels.commonStudents(teacher);
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

    res.status(204);
    res.json({
      success: true,
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.retrieveForNotifications = async (req, res, next) => {
  try {
    await teacherModels.retrieveForNotifications(req.body);
    res.json({
      success: true,
      message: "retrieve",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
