const express = require("express");
const router = express.Router();
const teacherRoutes = require("./teacher.route");

// load all routes and export it to express.js

// ping for status
router.get("/ping", (req, res) => {
  res.json({
    message: `server up @ ${new Date().toLocaleTimeString()}`,
  });
});

router.get("/", (req, res) => {
  res.json({
    message:
      "Hello! Try using POST /api/regiser, GET /api/commonstudents, POST /api/suspend, POST /api/retrievefornotifications",
  });
});

// prefix routes with api
router.use("/api", teacherRoutes);

module.exports = router;
