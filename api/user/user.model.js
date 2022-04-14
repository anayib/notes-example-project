'use strict'
const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const userScheme = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: false,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'visitor',
      enum: ['visitor', 'admin', 'owner'],
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    notes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Note',
        requred: false
      }
    ],
  },
  {
    timestamps: true,
  },
);


// trasnforms bjson data to json
userScheme.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
  }
});


/*
before saving in the user model check if the password has been modified.
If so, generate a new hashed password
*/

userScheme.pre('save', async function () {
  const user = this;

  try {
    if (!user.isModified('password')) {
      return next();
    }
    // generates the salt to encrypt the password
    const salt = await bcrypt.genSalt(10);
    // generate hashed password
    const hash = await bcrypt.hash(user.password, salt);
    // this is the hashed password that we are going to save in the DB
    user.password = hash;
  } catch (err) {
    next(err);
  }

});

userScheme.methods.checkPassword = async function(requestPassword) {
  const user = this;

  return await bcrypt.compare(requestPassword, user.password);
};

module.exports = model('User', userScheme);
