const Joi = require('joi');

module.exports = {

  // GET
  getComments: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number().min(1).max(100),
    },
  },

  // GET
  getComment: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // POST
  createComment: {
    body: {
      owner: Joi.number().required(),
      post: Joi.number().required(),
      content: Joi.string(),
    },
  },

  // PUT
  updateComment: {
    body: {
      content: Joi.string(),
    },
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // DELETE
  deleteComment: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },
};
