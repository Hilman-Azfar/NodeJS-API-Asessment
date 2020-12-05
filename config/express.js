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
// log all errors
app.use(logErrors);

// catch all if the endpoint requested does not exist
app.use(genericError);

app.use(databaseError);

// catch joi validation errors and send error msg
app.use(validationError);

// catch all other errors and send msg
app.use(errorHandler);

module.exports = app;
