'use strict'
const jwt = require('jsonwebtoken');
const { getUserByEmail, getUserById } = require('../api/user/user.service');


/**
 * Adds the user object as a property to the request object
 * returns 403 otherwise
 */

async function isAuthenticated(req, res, next) {
  /*
   Get the token from the request
     If the token exists, get the id from the token and find the user in the DB
   Get the user from the DDB
     if the user exists, add the user to the request object and call next
   ohetwise return 401 not authorized
   */
  try {
    const authHeader = req.headers.authorization || null;
    const [ , token] = authHeader.split(' ');
    const payload = await verifyToken(token);

    if (!payload) return res.status(401).end();

    const user = await getUserById(payload._id);

    if (!user) return res.status(401).end();

    req.user = user;
    next()
  } catch(error) {
    return next(error)
  }
};
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

async function verifyToken(token) {
  try {
    const payload = await jwt.verify(token, process.env.SECRET);
    return payload
  } catch(error) {
    return null;
  }
}

module.exports = {
  signToken,
  isAuthenticated,
}
