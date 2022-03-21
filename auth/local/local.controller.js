'use strict'
const { getUserByEmail } = require('../../api/user/user.service');
const { signToken } = require('../auth.service');

async function userSignInHandler(req, res) {
  try {
    const { email, password } = req.body;
    const user = await getUserByEmail(email);

    if (!user) throw new Error("Invalid credentials");

    const validPassword = await user.checkPassword(password);

    if (!validPassword) throw new Error("Invalid credentials");

    const token = await signToken({_id : user._id});

    res.status(201).json({ token });
  } catch(err) {
    res.status(401).json({err: err.message});
  }

};


module.exports = {
  userSignInHandler,
}
