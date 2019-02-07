const Note = require('../database/models').Note;

module.exports = {
  createNote: async(req, res) => {
    try {
      const { title, body} = req.body;
      const note = await Note.create({
        title,
        body,
      });
      res.status(201).json({
        message: 'Note created successfully',
        note
      })
    } catch (error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to create the note!'
      });
    }
  },
  updateNote: async(req, res) => {
    try {
      const { id } = req.params;
      const updatedNote = await Note.update(
        {...req.body},
        { 
          returning: true,
          where: { id }
        }
      );
      if (updatedNote[0] === 0) res.status(404).json({
        error: 'Note not found!'
      });
      res.status(200).json({
        message: 'Note updated successfully!',
        note: updatedNote
      })
    } catch (error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to update the note!'
      });
    }
  },
  getNote: async (req, res) => {
    try {
      const { id } = req.params;
      const note = await Note.findOne({ where: { id }});
      if (!note) res.status(404).json({
        error: 'Note not found!'
      });
      res.status(200).json({
        message: 'Note retrieved successfully!',
        note
      });
    } catch (error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to retrieved the note!'
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNote = await Note.destroy({ returning: true, where: { id }})
      if (!deletedNote) res.status(404).json({
        error: 'Note not found!'
      });
      res.status(200).json({
        message: 'Note delete successfully!',
        deletedNote
      });
    } catch (error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to delete the note!'
      });
    }
  },
  getAllNotes: async (req, res) => {
    try {
      const notes = await Note.findAll();
      if (notes.length < 1) {
        res.status(200).json({
          message: 'You don\'t have any notes yet'
        });
      }
      res.status(200).json({
        message: 'Notes retrieved successfully!',
        notes
      });
    } catch(error) {
      if (error) res.status(500).json({
        error: 'An error occured when trying to get your notes!'
      });
    }
  }
}