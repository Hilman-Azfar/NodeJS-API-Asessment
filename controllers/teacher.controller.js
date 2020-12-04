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
    const students = await teacherModels.commonStudents(req);
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
    res.json({
      success: true,
      message: "suspend",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.retrieveForNotifications = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "retrieve",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
