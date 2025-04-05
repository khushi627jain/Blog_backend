const Joi = require('joi');

module.exports = {
  loginValidation: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).unknown(),
  },
  signupValidation: {
    body: Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    }).unknown(),
  },
};
