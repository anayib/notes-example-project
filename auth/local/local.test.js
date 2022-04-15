'use strict'
const mongoose = require("mongoose");
const { dataBaseConnection, disconnectFromDB, dbCleanUp } = require('../../config/database');
const User = require('../../api/user/user.model');
const app = require('../../app');
const req = require('supertest');

describe('Local auth suite tests', () => {
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

  test("User login successfully", async () => {
    const response = await req(app)
      .post('/api/auth/local/login')
      .send({ email: "test1@gmail.com", password: "1234567"})
      .expect(201)
      .expect('Content-Type', /json/);

    expect(response.body).toHaveProperty('token');
  });

  test("User sign in fails", async () => {
    const response = await req(app)
      .post('/api/auth/local/login')
      .send({ email: "test1@gmail.com", password: "125"})
      .expect(401)
      .expect("Content-Type", /json/);

    expect(response.body).toHaveProperty("err", "Invalid credentials");
  });
});
