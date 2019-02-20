const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const { JWT_SECRET } = process.env;

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    minlength: 3,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
});

/**
 * Overides the model's default JSON stringify method
 * @returns Object with user ID and username
 */
userSchema.methods.toJSON = function toJSON() {
  const user = this;
  /* eslint-disable-next-line no-underscore-dangle */
  return { _id: user._id, username: user.username };
};

/**
 * Generates new JWT and returns it
 * @returns JWT
 */
userSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;
  const access = 'auth';
  const token = jwt.sign(
    {
      /* eslint-disable-next-line no-underscore-dangle */
      _id: user._id,
      username: user.username,
      access,
    },
    JWT_SECRET,
  );
  return token;
};

/**
 * Model pre-save hook to hash the password if it is changed
 */
userSchema.pre('save', function preSaveCheck(next) {
  const user = this;
  if (user.isModified('password')) {
    bcrypt.hash(user.password, 14, (error, hash) => {
      user.password = hash;
      next();
    });
  } else {
    next();
  }
});

const User = mongoose.model('User', userSchema);

module.exports = {
  User,
};
