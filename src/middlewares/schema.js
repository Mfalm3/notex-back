const Joi = require('joi');

module.exports = {
  userSchema: {
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required()
  },
  noteSchema: {
    title: Joi.string().required(),
    body: Joi.string().required()
  },
  loginSchema: {
    email: Joi.string().email({ minDomainAtoms: 2 }).required(),
    password: Joi.string().required()
  }
}
