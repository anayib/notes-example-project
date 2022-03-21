'use strict'
const jwt = require('jsonwebtoken');
const { getUserByEmail } = require('../api/user/user.service');


/**
 * Adds the user object as a property to the request object
 * returns 403 otherwise
 */
// async function isAuthenticated() {};


/**
 * Returns a json web token signed by the secret key
 * @param { String } payload containing the password
 * @returns { String } token
 */
async function signToken(payload) {
  const token = jwt.sign(payload, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 10
  });

  return token;
};

module.exports = {
  signToken,
}
