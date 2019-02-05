const express = require('express');
const authenticate = require('../middlewares/authenticate');
const notesController = require('../controllers').notes;
const validator = require('../middlewares/validator');

const notesRouter = express.Router();

notesRouter.post(
  '/notes',
  authenticate,
  validator.validateNoteBody,
  validator.checkNoteExists,
  notesController.createNote
);

notesRouter.patch(
  '/notes/:id',
  authenticate,
  notesController.updateNote
);

notesRouter.get(
  '/notes/:id',
  authenticate,
  notesController.getNote
);

notesRouter.delete(
  '/notes/:id',
  authenticate,
  notesController.deleteNote
);

notesRouter.get(
  '/notes',
  authenticate,
  notesController.getAllNotes
);

module.exports = notesRouter;
