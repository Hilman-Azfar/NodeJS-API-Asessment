const express = require("express");
const router = express.Router();
const teacherRoutes = require("./teacher.route");

// load all routes and export it to setup.js

// ping for status
router.get("/ping", (req, res) => {
  res.json({
    success: true,
    message: `server up @ ${new Date().toLocaleTimeString()}`,
  });
});

// prefix routes with api
router.use("/api", teacherRoutes);

module.exports = router;
