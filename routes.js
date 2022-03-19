'use strict'
//import endpoints
const note = require('./api/note');
const user = require('./api/user');
/*
routes definition function. The function receives an express app as a parameter and you call the use app method to add one middleware per entity endpoint
*/

function routes(app) {
  app.use('/api/notes', note);
  app.use('/api/users', user);
};

module.exports = routes;
