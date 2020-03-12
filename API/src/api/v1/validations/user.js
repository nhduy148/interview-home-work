const Joi = require('joi');
const User = require('../models/users');

module.exports = {

  // GET
  getUsers: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number().min(1).max(100),
    },
  },

  // GET
  getUser: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // POST
  createUser: {
    body: {
      id: Joi.number().min(1).required(),
      username: Joi.string().required(),
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required(),
      dob: Joi.date()
    },
  },

  // PUT
  updateUserInfo: {
    body: {
      password: Joi.string().min(6).max(128).required(),
      name: Joi.string().max(128).required(),
      dob: Joi.date()
    },
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // DELETE
  deleteUser: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },
};
