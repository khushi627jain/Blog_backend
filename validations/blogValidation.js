const Joi = require("joi");

module.exports = {
  createBlog: {
    body: Joi.object({
      title: Joi.string().required(),
      description: Joi.string().required(),
    }).unknown(), 
  },
  updateBlog: {
    body: Joi.object({
      title: Joi.string(),
      description: Joi.string(),
    }).unknown(),
  },
};
