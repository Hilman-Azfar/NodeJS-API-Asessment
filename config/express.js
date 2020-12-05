const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const {
  errorHandler,
  genericError,
  validationError,
  logErrors,
  databaseError,
} = require("../middlewares/error");

const routes = require("../routes");
const logger = require("./logger");

const app = express();

// set up logging
app.use(
  morgan("combined", {
    stream: {
      write: (message, encoding) => {
        logger.info(message);
      },
    },
  })
);

// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// require all routes
app.use(routes);

// error handling
app.use(logErrors);
app.use(genericError);
app.use(databaseError);
app.use(validationError);
app.use(errorHandler);

module.exports = app;
