const app = require("./config/setup");
const config = require("./config/env");
const logger = require("./config/logger");
const db = require("./config/db");

// set up db connection first
// if successful, set up server

// listen to port
const PORT = config.PORT || 8080;
const server = app.listen(PORT, () => {
  // add logging
  logger.info(`Server running on port: ${PORT}`);
});

// handle shutdown and disconnect from db and end running processes
const shutdown = () => {
  // log shutdown sequence
  logger.info("closing all pool connections");
  db.pool.end(() => {
    logger.info("all pool connections closed");
    logger.info("server shutting down");

    server.close(() => {
      logger.info("server shut down successfully. peace.");
      process.exit(0);
    });
  });
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown);
