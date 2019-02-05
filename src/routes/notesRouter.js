const express = require('express');
const notesController = require('../controllers').notes;
const validator = require('../middlewares/validator');

const notesRouter = express.Router();

notesRouter.post(
  '/notes',
  validator.validateNoteBody,
  validator.checkNoteExists,
  notesController.createNote
);

notesRouter.patch(
  '/notes/:id',
  notesController.updateNote
);

notesRouter.get(
  '/notes/:id',
  notesController.getNote
);

notesRouter.delete(
  '/notes/:id',
  notesController.deleteNote
);

notesRouter.get(
  '/notes',
  notesController.getAllNotes
);

module.exports = notesRouter;
