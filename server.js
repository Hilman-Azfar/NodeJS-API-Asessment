const app = require("./config/setup");
const config = require("./config/env");
const logger = require("./config/logging");

// set up db connection first
// if successful, set up server

// listen to port
const PORT = config.PORT || 8080;
const server = app.listen(PORT, () => {
  // add logging
  console.log("server up and running on: " + PORT);
});

// handle shutdown and disconnect from db and end running processes
const shutdown = () => {
  // log shutdown sequence
  console.log("server shutting down");
  server.close(() => {
    console.log("server closed. peace");
    process.exit(0);
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown);
