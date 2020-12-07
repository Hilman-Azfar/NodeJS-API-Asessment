/**
 *  split by whitespace + a
 *  use non capturing group to not include whitepace + a in split array
 *  use positive look ahead to match without including it in the result
 *  the regex is based off rfc 2822
 *  emails are expected to be lowercased
 *  reference: https://includestdio.com/1623.html
 * @param {string} notification
 * @return {string[]} parsed
 * parsed[0] = message
 * parsed[n] = email
 */

module.exports = (notification) => {
  const parsed = notification.split(
    /(?:\s@)(?=[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)/g
  );
  return parsed;
};
