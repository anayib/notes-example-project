'use strict'

const mongoose = require('mongoose');
const URI = process.env.DB_URI;

async function dataBaseConnection() {
  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('Connnected to MongoDB successfully');
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}

module.exports = dataBaseConnection;
