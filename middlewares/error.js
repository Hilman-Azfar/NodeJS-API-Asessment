const { ValidationError } = require("express-validation");
const db = require("../config/db");
const logger = require("../config/logger");

exports.logErrors = (err, req, res, next) => {
  logger.error(err.message + " @ " + err.location);
  next(err);
};

/**
 *  Catch all routes not matched
 */
exports.genericError = (req, res, next) => {
  const err = new Error(`Endpoint does not exist...`);
  err.status = 404;
  next(err);
};

/**
 * If database fails to set up, send temporary down
 */
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

/**
 * Use error codes as source of truth and send
 * standardized error messages
 */
exports.errorHandler = (err, req, res, next) => {
  let { status = 404, message } = err;

  let errmessage = null;

  if (err.code) {
    switch (err.code) {
      case "ER_DUP_ENTRY":
        status = 409;
        errmessage = "Entry exists";
        break;
    }
  }
  res.status(status);
  res.json({
    message: errmessage || message,
  });
};
