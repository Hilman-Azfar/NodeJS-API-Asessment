const { ValidationError } = require("express-validation");
const logger = require("../config/logger");

exports.logErrors = (err, req, res, next) => {
  logger.error(err);
  next(err);
};

exports.validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode);
    res.json(err);
  } else {
    next(err);
  }
};

exports.genericError = (req, res, next) => {
  const err = new Error("Endpoint does not exist...");
  err.status = 404;
  next(err);
};

exports.errorHandler = (err, req, res, next) => {
  const { status, message } = err;

  res.status(status);
  res.json({
    success: false,
    error: message,
  });
};
