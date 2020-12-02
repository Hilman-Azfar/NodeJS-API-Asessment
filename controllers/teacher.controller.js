exports.register = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "register",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.commonStudents = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: req.query,
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.suspend = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "suspend",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};

exports.retrieveForNotifications = async (req, res, next) => {
  try {
    res.json({
      success: true,
      message: "retrieve",
    });
  } catch (err) {
    err.status = 404;
    next(err);
  }
};
