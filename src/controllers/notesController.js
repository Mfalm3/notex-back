const Note = require('../database/models').Note;

module.exports = {
  createNote: async(req, res) => {
    try {
      const { title, body} = req.body;
      const { id } = req.user;
      const note = await Note.create({
        title,
        body,
        userId: id
      });
      return res.status(201).json({
        message: 'Note created successfully',
        note
      })
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to create the note!'
      });
    }
  },
  updateNote: async(req, res) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const updatedNote = await Note.update(
        {...req.body},
        { 
          returning: true,
          where: { id, userId }
        }
      );
      if (updatedNote[0] === 0) return res.status(404).json({
        error: 'Note not found!'
      });
      return res.status(200).json({
        message: 'Note updated successfully!',
        note: updatedNote
      })
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to update the note!'
      });
    }
  },
  getNote: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const { id } = req.params;
      const note = await Note.findOne({ where: { id, userId }});
      if (!note) return res.status(404).json({
        error: 'Note not found!'
      });
      return res.status(200).json({
        message: 'Note retrieved successfully!',
        note
      });
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to retrieved the note!'
      });
    }
  },
  deleteNote: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedNote = await Note.destroy({ returning: true, where: { id }})
      if (!deletedNote) return res.status(404).json({
        error: 'Note not found!'
      });
      return res.status(200).json({
        message: 'Note delete successfully!',
        deletedNote
      });
    } catch (error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to delete the note!'
      });
    }
  },
  getAllNotes: async (req, res) => {
    try {
      const { id: userId } = req.user;
      const notes = await Note.findAll({ where: { userId }});
      if (notes.length < 1) {
        return res.status(200).json({
          message: 'You don\'t have any notes yet'
        });
      }
      return res.status(200).json({
        message: 'Notes retrieved successfully!',
        notes
      });
    } catch(error) {
      if (error) return res.status(500).json({
        error: 'An error occured when trying to get your notes!'
      });
    }
  }
}