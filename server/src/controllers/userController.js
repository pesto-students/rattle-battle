import bcrypt from 'bcrypt';
import User from '../database/models/user';

const createNewUser = async (req, res) => {
  const { email, username, password } = req.body;

  const newUser = new User({
    email,
    username,
    password,
  });
  try {
    await newUser.hashPassword();
    await newUser.save();
    const token = newUser.generateAuthToken();
    res.set('X-Auth-Token', token);
    return res.send(newUser);
  } catch (err) {
    if (err.code === 11000) {
      return res.status(409).send({ errors: 'Username/E-Mail is taken.' });
    }
    return res.status(500).send({ errors: 'Something went wrong while signing up.' });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        errors: 'No user record found',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).send({
        errors: 'Invalid password',
      });
    }

    const token = user.generateAuthToken();
    res.set('X-Auth-Token', token);
    return res.send(user);
  } catch (err) {
    return res.status(500).send({ errors: 'Something went wrong while logging in.' });
  }
};

export default {
  createNewUser,
  loginUser,
};
