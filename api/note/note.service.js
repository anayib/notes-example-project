'use strict'
/*
This file includes how to create a description per function. You can access that description from any file by hovering over the function name.
*/

// require the note module
const Note = require('./note.model');
const User = require('../user/user.model');
const mongoose = require('mongoose');

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};


/**
 * Validates that a userId corresponds to the userId associated to a note
 * @return true/false boolen
 * */
async function validUser(userId, id ) {
  const currentNote = await Note.findById(id);
  return userId.toString() === currentNote.userId.toString();
}


/**
 * Get all notes
 * @returns all notes saved in the mongoDB DB
 */
async function getAllNotes() {
  const notes = await Note.find();
  return notes;
}


/**
 * Get one single note
 * @param { String }
 * @returns one sigle note or not found
 */

async function getNote(id) {
  const note = await Note.findById(id);
  console.log(note)
  return note;
};

/**
 * Create a new note in the MongoDB DB
 * Get from the request body the attributes for the note to be created
 * @param { Object }
 */
async function createNote(note) {
  // creates a Note object form Note prototype
  const user = await User.findById(note.userId);
  const newNote = new Note(note);
  // save note to MongoDB DB
  const storedNote = await newNote.save();
  user.notes = user.notes.concat(storedNote._id);
  await user.save();

  return storedNote;
};

/**
 * Update an existing note by id
 * @param { Object } note body of the note to be updated
 * @returns the note as it was before updating it
 */
async function updateNote(noteId, userId, note) {
  if (!validUser(userId, noteId)) {
    return new Error(`You are not allowed to edit this note`);
  };

  const updatedNote = await Note.findByIdAndUpdate(noteId, note)

  return updatedNote;
};

/**
 * Delete an existing note by id
 * @param { String } id of the note to be deleted
 * @returns the deleted note
 */
async function deleteNote(id, userId) {
  if (!validUser(userId, id)) {
    return new Error(`You are not allowed to edit this note`);
  };

  const deletedNote = await Note.findByIdAndDelete(id);
  return deletedNote;
};
