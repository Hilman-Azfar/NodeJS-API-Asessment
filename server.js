const config = require("./config/env");
const logger = require("./config/logger");
const db = require("./config/db");

// set up handled in here
const app = require("./config/express");

const PORT = config.PORT || 8080;

db.initialize();
const server = app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`);
});

// handle shutdown and disconnect from db and end running processes
const shutdown = () => {
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
