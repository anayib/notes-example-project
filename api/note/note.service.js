'use strict'
/*
This file includes how to create a description per function. You can access that description from any file by hovering over the function name.
*/

// require the note module
const Note = require('./note.model');
const mongoose = require('mongoose');

module.exports = {
  getAllNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
};

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
  return note;
};

/**
 * Create a new note in the MongoDB DB
 * Get from the request body the attributes for the note to be created
 * @param { Object }
 */
async function createNote(note) {
  // creates a Note object form Note prototype
  const newNote = new Note(note);
  // save note to MongoDB DB
  const storedNote = await newNote.save();
  return storedNote;
};

/**
 * Update an existing note by id
 * @param { String } id of the note to be updated if it exists
 * @param { Object } note body of the note to be updated
 * @returns the note as it was before updating it
 */
async function updateNote(id, note) {
  const updatedNote = await Note.findOneAndUpdate(id, note);
  return updatedNote;
};

/**
 * Delete an existing note by id
 * @param { String } id of the note to be deleted
 * @returns the deleted note
 */
async function deleteNote(id) {
  const deletedNote = await Note.findOneAndDelete(id);
  return deletedNote;
};
