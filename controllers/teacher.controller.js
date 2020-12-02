exports.register = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "hello",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
