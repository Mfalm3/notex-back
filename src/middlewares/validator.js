const Joi = require('joi');
const models = require('../database/models');
const schema = require('./schema');

module.exports = {
  validateNoteBody: (req, res, next) => {
    Joi.validate(req.body, schema.noteSchema, (err) => {
      if (err) res.status(400).json({
        error: err.details[0].message
      });
      next();
    });
  },
  checkNoteExists: async (req, res, next) => {
    try {
      const { title, body } = req.body;
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