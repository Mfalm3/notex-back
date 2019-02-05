const Joi = require('joi');
const models = require('../database/models');
const schema = require('./schema');

module.exports = {
  validateUserBody: (req, res, next) => {
    Joi.validate(req.body, schema.userSchema, (err) => {
      if (err) res.status(400).json({
        error: err.details[0].message
      });
      next();
    })
  },
  validateNoteBody: (req, res, next) => {
    Joi.validate(req.body, schema.noteSchema, (err) => {
      if (err) res.status(400).json({
        error: err.details[0].message
      });
      next();
    });
  },
  checkUserExists: async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await models.User.findOne({ where: { email }});
      if (user) return res.status(400).json({
        error: 'User already exists!'
      })
      next();
    } catch(error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to check if the user exists!'
      });
    }
  },
  checkNoteExists: async (req, res, next) => {
    try {
      const { title, body } = req.body;
      const { id } = req.user;
      const user = await models.User.findOne({ where: { id }});
      if (!user) return res.status(401).json({
        error: 'Create and account and sign in to create note'
      })
      const note = await models.Note.findOne({ where: { title, body }});
      if (note) return res.status(400).json({
        error: 'Note already exists!'
      })
      next();
    } catch(error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to check if the note exists!'
      });
    }
  }
}