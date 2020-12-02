const Joi = require("joi");

// create schemas for the headers, body, params, queries
module.exports = {
  register: {
    body: Joi.object({
      teacher: Joi.string().email().required(),
      students: Joi.array().items(Joi.string().email().required()),
    }),
  },
  commonStudents: {
    query: Joi.object({
      teacher: Joi.string().email().required(),
    }),
  },
  suspend: {
    body: Joi.object({
      student: Joi.string().email().required(),
    }),
  },
  notification: {
    body: Joi.object({
      teacher: Joi.string().email().required(),
      notification: Joi.string().required(),
    }),
  },
};

// string manipulation/regex to sort out emails in the notification string
