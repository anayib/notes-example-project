'use strict'
// import endpoints
const note = require('./api/note'); // It will import the index file from the folder by default

// routes definition function. The function receives an express app as a parameter and you call the use app method to add one middleware per entity endpoint

function routes(app) {
  app.use('/api/notes', note);
};

module.exports = routes;
