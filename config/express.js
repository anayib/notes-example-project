'use strict'
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

module.exports = expressConfig;

function expressConfig(app) {
  app.use(cors());
  app.use(morgan('dev'));
  app.use(express.json());
}
