'use strict'
// require mongoose, supertest, db configuration
const mongoose = require('mongoose');
const req = require('supertest');
const app = require('../../app');
const { dataBaseConnection, disconnectFromDB, dbCleanUp} = require('../../config/database');
const User  = require('./user.model');

describe('User suite test when one user exists', () => {
  beforeAll(async () => {
    await dataBaseConnection();
  });

  beforeEach(async () => {
    await dbCleanUp();

    const newUser =  {
     firstName: "Laura",
     password: "1234567",
     lastName: "Arbol",
     email: "test1@gmail.com"
    }

    await User.create(newUser);
  });

  afterAll(async () => {
    await disconnectFromDB();
  });

  test('Create a new user', async () => {
    const usersInDbAtStart = await User.find();

    const newUser =  {
     firstName: "Nayib",
     password: "12345",
     lastName: "abdala",
     email: "test2@gmail.com"
    }

    await req(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /json/);

    const usersInDbAtEnd = await User.find();
    expect(usersInDbAtEnd).toHaveLength(usersInDbAtStart.length + 1);

    const userNames = usersInDbAtEnd.map( user => user.firstName);
    expect(userNames).toContain(newUser.firstName);

  });

  test("User creation fails when email is already in use", async () => {
    const usersInDbAtStart = await User.find();
    const newUser =  {
     firstName: "Laura",
     password: "1234567",
     lastName: "Arbol",
     email: "test1@gmail.com"
    }

    const response = await req(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /json/);

    expect(response.body.error).toContain("Can't create a user with this email");

    const usersInDbAtEnd = await User.find();
    expect(usersInDbAtEnd).toHaveLength(usersInDbAtStart.length);
  });

});

