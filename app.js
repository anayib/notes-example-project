'use strict'

const path = require('path');

// set environment variables from .env.xxx file depending on NODE_ENV variable
require('dotenv').config({
  path: path.resolve(
    process.cwd(),
    process.env.NODE_ENV !== "production"
      ? `.env.${process.env.NODE_ENV}`
      : `.env`
  ),
});

const express = require('express');
const expressConfig =  require('./config/express.js')
const app = express();
const routes = require('./routes'); // routes function that add a middleware per each entity router

expressConfig(app);
// The last middleware should hadle any error not handled previously
routes(app) // routes function call that receives the express app as a parameter and add a middleware per entity - app.use(<endpoint_match>, <entity_routes> )

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message);
});

module.exports = app;
