'use strict'
//import endpoints
const note = require('./api/note');
const user = require('./api/user');
const authLocal = require('./auth/local')
/*
routes definition function. The function receives an express app as a parameter and you call the use app method to add one middleware per entity endpoint
*/

function routes(app) {
  app.use('/api/notes', note);
  app.use('/api/users', user);
  // auth routes
  app.use('/api/auth/local', authLocal);
};

module.exports = routes;
