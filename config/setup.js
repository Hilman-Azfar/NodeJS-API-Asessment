const express = require("express");
const helmet = require("helmet");
const config = require("./env");
const morgan = require("morgan");

const {
  errorHandler,
  genericError,
  validationError,
  logErrors,
} = require("../middlewares/error");

const routes = require("../routes");
const logger = require("./logger");

const app = express();

// set up logging

// logging to terminal
// use morgan middleware to log http requests

// clean up
// format for errors too
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

// catch joi validation errors and send error msg
app.use(validationError);

// catch all other errors and send msg
app.use(errorHandler);

module.exports = app;
