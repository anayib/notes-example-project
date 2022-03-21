const { signUpUser, getUserById, getUserByEmail } = require("./user.service");
const  { signToken } = require('../../auth/auth.service');

/**
 * Creates a new user in the database. If the user already exists returns an error, otherwise it creates it and returns a token for future requests
 */
async function signUpUserHandler(req, res) {
  try {
    const newUser = req.body;
    const currentUser = await getUserByEmail(newUser.email);
    // validate if user exists
    if (currentUser) {
      throw new Error("Can't create a user with this email");
    };
    // encrypt the user password is done in the model
    // Create the user
    const user = await signUpUser(newUser);
    // Create/Sign the json web token
    const token = await signToken({ _id: user.id });

    res.status(201).json(
      { token,
        firstName: user.firstName,
        message: "new user created successfully"
      });

  } catch(err) {
    res.status(400).json({error: err.message});
  }
};

async function getUserByIdHandler(req, res) {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    res.status(201).json({email: user.email, firstName: user.name});
  } catch (err) {
    res.status(401).json({ error: err.message });
  };
}

module.exports = {
  signUpUserHandler,
  getUserByIdHandler,
};
