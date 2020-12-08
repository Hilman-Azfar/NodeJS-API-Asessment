const logger = require("../config/logger");

const waitPromise = (time) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
};

const retryPromise = async (cb, delay = 10000, retry = 10) => {
  for (let i = 0; i < retry; i++) {
    try {
      return await cb();
    } catch (error) {
      logger.info("attempting to reconnect...");
      await waitPromise(delay);
    }
  }
};

module.exports = retryPromise;
