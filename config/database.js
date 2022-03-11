'use strict'
const mongoose = require('mongoose');

async function dataBaseConnection() {
  const URI = process.env.DB_URI;

  try {
    await mongoose.connect(URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`Connnected to DB successfully ${URI}`);
  } catch(err) {
    console.log(err);
    process.exit(1);
  }
}


async function disconnectFromDB() {
  if(!mongoose.connection) return;

  await mongoose.disconnect();

  console.log("Disconnected from DB successfully")
};

 // deletes all the documents per collection after each test is run
async function dbCleanUp() {
  const promises = [];

  for (let collection in mongoose.connection.collections) {
      promises.push(mongoose.connection.collections[collection].deleteMany({}));
  }

  await Promise.all(promises);
};

module.exports = { dataBaseConnection, disconnectFromDB, dbCleanUp }
