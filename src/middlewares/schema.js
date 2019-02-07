const Joi = require('joi');

module.exports = {
  noteSchema: {
    title: Joi.string().required(),
    body: Joi.string().required()
  }
}
