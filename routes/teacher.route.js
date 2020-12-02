const express = require("express");
const { validate } = require("express-validation");
const router = express.Router();
const teacherControl = require("../controllers/teacher.controller");
const valid = require("../middlewares/validators/teacher.schema");

module.exports = router;

// validate each request with joi and express-validation
// validation schemas can be found in the middleware validators
router.post("/register", validate(valid.register), teacherControl.register);

router.get(
  "/commonstudents",
  validate(valid.commonStudents),
  teacherControl.commonStudents
);

router.post("/suspend", validate(valid.suspend), teacherControl.suspend);

router.post(
  "/retrievefornotifications",
  validate(valid.notification),
  teacherControl.retrieveForNotifications
);
