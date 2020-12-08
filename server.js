const config = require("./config/env");
const logger = require("./config/logger");
const db = require("./database");
const retryPromise = require("./utility/retryPromise");
const app = require("./config/express");

const PORT = config.PORT || 8080;

db.initialize().catch(() => retryPromise(db.initialize, 5000, 5));

const server = app.listen(PORT, () => {
  logger.info(`Server running on port: ${PORT}`);
});

const shutdown = async () => {
  logger.info("closing all pool connections");
  try {
    await db.pool.end();
    logger.info("all pool connections closed");
    logger.info("server shutting down");
  } catch (err) {
    logger.error(err);
  } finally {
    server.close(() => {
      logger.info("server shut down successfully. peace.");
      process.exit(0);
    });
  }
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
process.on("SIGHUP", shutdown);
