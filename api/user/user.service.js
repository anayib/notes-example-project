const User = require('./user.model');

async function getUserById(id) {
  const user = User.findById(id);
  return user;
};

async function getUserByEmail( email ) {
  const user = await User.findOne({email});
  return user;
};

async function signUpUser(user) {
  const newUser = await User.create(user);
  return newUser;
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
  updateUser,
  deleteUser,
  getUserById,
  getUserByEmail,
};
