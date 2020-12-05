const { ValidationError } = require("express-validation");
const db = require("../config/db");
const logger = require("../config/logger");

exports.logErrors = (err, req, res, next) => {
  logger.error(err.message + " @ " + err.location);
  next(err);
};

exports.genericError = (req, res, next) => {
  const err = new Error(`Endpoint does not exist...`);
  err.status = 404;
  next(err);
};

exports.databaseError = (err, req, res, next) => {
  if (db.error === true) {
    res.status(503);
    res.json({ message: "Service is unavailable for now. Try again later" });
  } else {
    next(err);
  }
};

exports.validationError = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(err.statusCode);
    res.json({ message: err.details[0] });
  } else {
    next(err);
  }
};

exports.errorHandler = (err, req, res, next) => {
  const { status = 404, message } = err;

  let errmessage = null;

  if (err.code) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        status = 409;
        errmessage = "Entry exists";
        break;
      default:
    }
  }
  res.status(status);
  res.json({
    message: errmessage || message,
  });
};
