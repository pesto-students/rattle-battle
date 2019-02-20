
import User from '../database/models/user';

const createNewUser = (req, res) => {
  const { email, username, password } = req.body;

  const newUser = new User({
    email,
    username,
    password,
  });
  return newUser
    .save()
    .then(() => {
      const token = newUser.generateAuthToken();
      res.set('X-Auth-Token', token);
      return res.send(newUser);
    })
    .catch((err) => {
      if (err.code === 11000) {
        return res.status(409).send({ errors: 'Username/E-Mail is taken.' });
      }
      return res.status(500).send({ errors: 'Something went wrong while signing up.' });
    });
};

export default {
  createNewUser,
};
