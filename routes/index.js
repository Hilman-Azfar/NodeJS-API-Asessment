const express = require("express");
const router = express.Router();
const teacherRoutes = require("./teacher.route");

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

router.use("/api", teacherRoutes);

module.exports = router;
