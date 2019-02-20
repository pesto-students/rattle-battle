
const bcrypt = require('bcrypt');
const { User } = require('../database/Models/User');

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

const loginUser = (req, res) => {
  const { email, password } = req.body;

  return User.findOne({ email }, (dbErr, user) => {
    if (user) {
      return bcrypt.compare(password, user.password, (bcryptErr, match) => {
        if (match) {
          const token = user.generateAuthToken();
          res.set('X-Auth-Token', token);
          return res.send(user);
        }
        return res.status(401).send({
          errors: 'Invalid password',
        });
      });
    }
    return res.status(400).send({
      errors: 'No user record found',
    });
  });
};

module.exports = {
  createNewUser,
  loginUser,
};
