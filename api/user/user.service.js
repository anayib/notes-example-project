const mongoose = require('mongoose');
const User = require('./user.model');
const bcrypt = require("bcrypt");
const { findById } = require('./user.model');
const jwt = require("jsonwebtoken");

async function getUserById(id) {
  const user = User.findById(id);
  return user;
};

async function getUserByEmail({ email }) {
  const user = await User.findOne({email});
  return user;
}

async function generateToken(payload) {
  // sign-generate new token
  const token = jwt.sign(
    {_id: payload},
    process.env.SECRET,
    {expiresIn: 60 * 60 * 24 * 7} // expires in 7 days
  );

  return token;
};

async function signUpUser(user) {
  const newUser = await User.create(user);
  return newUser;
};

async function signInUser(id) {
  const user = User.findById(id);
};

async function updateUser(id, user) {
  const updatedUser = User.findOneAndUpdate(id, user);
  return updatedUser;
}

async function deleteUser(id) {
  const deletedUser = User.findOneAndDelete(id);
  return deletedUser;
};

module.exports = {
  signUpUser,
  signInUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
  generateToken,
};
