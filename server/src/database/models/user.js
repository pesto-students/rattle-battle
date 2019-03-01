import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { generateJWT } from '../../utils/encryptUtils';
import { modelToJSON } from '../../utils/databaseUtils';

const userSchema = new Schema({
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
  onlineStatus: {
    type: Boolean,
    default: true, // intial value because presumably the user is online when entry is created
  },
});

/**
 * Overides the model's default JSON stringify method
 * @returns Object with user ID and username
 */
userSchema.methods.toJSON = function toJSON() {
  return modelToJSON(this, ['id', 'username']);
};

/**
 * Generates new JWT and returns it
 * @returns JWT
 */
userSchema.methods.generateAuthToken = function generateAuthToken() {
  const user = this;
  const access = 'auth';
  const { id, username } = user;
  const token = generateJWT({
    id,
    username,
    access,
  });
  return token;
};

/**
 * Hashes the password on the user model
 * @returns User model
 */
userSchema.methods.hashPassword = async function hashPassword() {
  const user = this;
  const hashedPassword = await bcrypt.hash(user.password, 14);
  user.password = hashedPassword;
  return user;
};

// eslint-disable-next-line func-names
const setOnlineStatus = onlineStatus => function (user) {
  return this.findOneAndUpdate(user, { $set: { onlineStatus } });
};

userSchema.statics.setOnline = setOnlineStatus(true);

userSchema.statics.setOffline = setOnlineStatus(false);

const User = model('User', userSchema);

export default User;
