'use strict'

const mongoose  = require("mongoose");
const req = require("supertest"); // requires supertest test library to simulate server requests in the tests
const app = require("../../app"); // requires the app object initialization
const { dataBaseConnection, disconnectFromDB, dbCleanUp } = require("../../config/database");

describe('note', () => {
  // connet to the DB before running all the tests
  beforeAll(async () => {
    await dataBaseConnection();
  });

  //Clean up the DB before running each test to gurantee we do not have repeated records
  beforeEach(async () => {
    await dbCleanUp();
  });

  // Disconnect from the DB after running all the tests
  afterAll(async () => {
    await disconnectFromDB();
  });

  test('Getting all notes successfully', async () => {
    const res = await req(app).get('/api/notes');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveLength(0)
  });

  // creates a note successfully. test.each helps to create several instances
  test.each([
    { title: "My first note", details: "Details of my first note", important: true,},
    { title: "My second note", details: "Details of my second note", important: true,},
    { title: "My third note", details: "Details of my third note", important: false,},
  ])('Creating a single note successfully', async ({title, details, important} ) => {
    // Creating the note
      const res = await req(app).post('/api/notes').set('Accept', 'application/json').send({title, details, important});
    // Testing the response of the note creation
      expect(res.headers["content-type"]).toMatch('json');
      expect(res.body.title).toMatch(title);
      expect(res.body.details).toMatch(details);
      expect(res.body.important).toBe(important);
      expect(res.statusCode).toEqual(201);
  });

  test('Updating a single note successfully', async () => {

    const originalNote = {
      title: "Note to be updated title",
      details : "Note to be updated details",
      important: false,
    };

    const updatedNote = {
      title: "Updated note",
      details: "Updated note details",
      important: true,
    }

    const note = await req(app).post('/api/notes').set('Content-Type', 'application/json').send(originalNote);
    const res = await req(app).put(`/api/notes/${note.body._id}`).set('Content-Type', 'application/json').send(updatedNote);
    // put route returns the orginal properties of the updated note
    expect(res.statusCode).toBe(200);
    expect(res.body.title).toMatch(originalNote.title);
    expect(res.body.details).toMatch(originalNote.details);
    expect(res.body.important).toBe(originalNote.important);

  });

  test('Getting a single note successfully', async () => {
    const noteToBeFetched = {
      title: "Note to be fetched",
      details: "Details of note to be fetched",
      important: true,
    }

    const note = await req(app).post('/api/notes').set('Content-Type', 'application/json').send(noteToBeFetched);
    const res = await req(app).get(`/api/notes/${note.body._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.title).toMatch(noteToBeFetched.title);
    expect(res.body.details).toMatch(noteToBeFetched.details);
    expect(res.body.important).toBe(noteToBeFetched.important);
  });

  test('Deleting a single note successfully', async () => {
    const note = {
      title: "Note to be deleted",
      details: "Details note to be deleted",
      important: false,
    };

    const resNote = await req(app).post('/api/notes').send(note);
    const res = await req(app).delete(`/api/notes/${resNote.body._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.note._id).toMatch(resNote.body._id);
    expect(res.body).toHaveProperty('message', `The note with id: ${resNote.body._id} has been deleted successfully`);
  });

  test('Failing getting all notes', async () => {
    const res = await req(app).get('/notes/');

    expect(res.body).not.toHaveProperty('notes');
  });

  test('Faling creting one single note', async () => {
    const res = await req(app).get('/api/notes/').send();

    expect(res.statusCode).not.toHaveProperty('title');
  });

  test('Faling getting one single note', async () => {
    const res = await req(app).get('/api/notes/622b394ea17a5e4d4003a107');

    expect(res.statusCode).toBe(404);
  });

  test('Failing updating one single note', async () => {
    const res = await req(app).put('/api/notes/622b394ea17a5e4d4003a107').send({title: "new title"});
    console.log(res.body)
    expect(res.statusCode).toBe(404);
    expect(res.body).toHaveProperty(
      'message',
      `The note woth id 622b394ea17a5e4d4003a107 can't be updated because it does not exists`
    );
  });

  test('Failing deleting one single note', async () => {
    const res = await req(app).delete('/api/notes/123456');

    expect(res.statusCode).toBe(404);
  });

});
