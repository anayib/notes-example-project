const { signUpUser, signInUser, getUserById, getUserByEmail, generateToken } = require("./user.service");

async function userSignUpHandler(req, res) {
  try {
    const newUser = req.body;
    const currentUser = await getUserByEmail(newUser);
    // validate if user exists
    if (currentUser) {
      console.log("user already exists");
      throw new Error("Can't create a user with this email");
    };
    // encrypt the user password is done in the model
    // Create the user
    const user = await signUpUser(newUser);
    // Create the json web token
    const token = await generateToken(user.id);
    res.status(201).json({ token, firstName: user.firstName, message: "new user created successfully" });
  } catch(err) {
    res.status(400).json({error: err.message});
  }
};

async function getUserByIdHandler(req, res) {};

async function userSignInHandler(req, res) {};

module.exports = {
  userSignUpHandler,
  userSignInHandler,
  getUserByIdHandler,
};
