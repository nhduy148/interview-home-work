const Joi = require('joi');

module.exports = {

  // GET
  register: {
    body: {
      username: Joi.string().required,
      password: Joi.string().required,
    },
  },

  // GET
  login: {
    body: {
      username: Joi.string().required,
      password: Joi.string().required,
    },
  },
};
