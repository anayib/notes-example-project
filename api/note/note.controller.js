'use strict'
const {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} = require('./note.service');

module.exports = {
  getAllNotesHandler,
  getNoteHandler,
  createNoteHandler,
  updateNoteHandler,
  deleteNoteHandler,
};
async function getAllNotesHandler (req, res) {
  try {
    const notes = await getAllNotes();

    return res.status(200).json(notes);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
};

async function getNoteHandler (req, res) {
  const { id } = req.params;

  try {
    const note = await getNote(id);

    if (!note) {
      return res.status(404).json({
        message: `The note with id: ${id} does not exists`
      });
    }

    return res.status(200).json(note);
  } catch (err) {
    return  res.status(500).json({ error: err.message });
  }
};

async function createNoteHandler (req, res) {
  try {
    const newNote = { ...req.body };
    const note = await createNote(newNote);

    return res.status(201).json(note);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

async function updateNoteHandler (req, res) {
  const { id } = req.params;
  const { body } = req;

  try {
    const note = await updateNote(id, body);

    if (!note) {
      return res.status(404).json({ message: `The note woth id ${ id } can't be updated because it does not exists`});
    }

    return res.status(200).json(note);
  } catch (err) {
    return res.status(500).json({ message: err.message});
  }
};

async function deleteNoteHandler (req, res) {
  const { id } = req.params;
  try {
    const note = await deleteNote(id);

    if (!note) {
      return res.status(404).json({ message: `Can't delete note with id: ${id} because it doesn't exist`});
    }

    return res.status(200).json({ message: `The note with id: ${id} has been deleted successfully`, note });
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
};


