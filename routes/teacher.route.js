const express = require("express");
const teacherControl = require("../controllers/teacher.controller");
const router = express.Router();

// controller

module.exports = router;

router.post("/register", teacherControl.register);
