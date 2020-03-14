const Joi = require('joi');

module.exports = {

  // GET
  getPosts: {
    query: {
      page: Joi.number().min(1),
      limit: Joi.number().min(1).max(100),
    },
  },

  // GET
  getPost: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // POST
  createPost: {
    body: {
      owner: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string(),
      tags: Joi.array()
    },
  },

  // PUT
  updatePost: {
    body: {
      owner: Joi.number().required(),
      title: Joi.string().required(),
      content: Joi.string(),
    },
    params: {
      id: Joi.number().min(1).required(),
    },
  },

  // DELETE
  deletePost: {
    params: {
      id: Joi.number().min(1).required(),
    },
  },
};
