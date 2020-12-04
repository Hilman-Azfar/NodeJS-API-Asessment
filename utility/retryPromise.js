const logger = require("../config/logger");

const waitPromise = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const retryPromise = async (cb) => {
  const retry = 10;
  for (let i = 0; i < retry; i++) {
    try {
      return await cb();
    } catch (error) {
      logger.error(error);
      logger.info("attempting to reconnect...");
      const delay = 10000;
      await waitPromise(delay);
    }
  }
};

module.exports = retryPromise;
