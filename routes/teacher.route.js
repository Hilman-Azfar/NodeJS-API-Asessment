const express = require("express");
const { validate } = require("express-validation");
const router = express.Router();
const teacherControl = require("../controllers/teacher.controller");
const valid = require("../middlewares/validators/teacher.schema");

const flatErrorValidate = (schema) => {
  const options = {
    context: false,
    statusCode: 400,
    keyByField: true,
  };
  return validate(schema, options);
};

module.exports = router;

router.post(
  "/register",
  flatErrorValidate(valid.register),
  teacherControl.register
);

router.get(
  "/commonstudents",
  flatErrorValidate(valid.commonStudents),
  teacherControl.commonStudents
);

router.post(
  "/suspend",
  flatErrorValidate(valid.suspend),
  teacherControl.suspend
);

router.post(
  "/retrievefornotifications",
  flatErrorValidate(valid.notification),
  teacherControl.retrieveForNotifications
);
