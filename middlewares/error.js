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
