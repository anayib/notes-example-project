'use strict'

const express = require('express');
const expressConfig =  require('./config/express.js')
const app = express();

expressConfig(app);
// The last middleware should hadle any error not handled previously
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
