/**
 * converts string or array of strings to lowercase
 * no checking if input is actual email yet
 * @param {string|string[]} email
 * @returns {string|string[]}
 */

const toLowerCaseEmail = (email) => {
  if (typeof email === "string") {
    return email.toLowerCase();
  } else if (Array.isArray(email)) {
    return email.map((email) => email.toLowerCase());
  }
};

module.exports = toLowerCaseEmail;
