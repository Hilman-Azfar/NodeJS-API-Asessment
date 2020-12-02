const express = require("express");
const helmet = require("helmet");
const config = require("./env");
const fs = require("fs");
const {
  errorHandler,
  genericError,
  validationError,
} = require("../middlewares/error");
const routes = require("../routes");

const app = express();

// set up logging

// logging to terminal
if (config.DEBUG === true) {
}

// logging to access.log

// middleware
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use(routes);

// error handling
app.use(genericError);
app.use(validationError);
app.use(errorHandler);

module.exports = app;
