const { check } = require('express-validator/check');

const UserValidator = [
  check('email')
    .isEmail()
    .withMessage('must be a valid email'),
  check('username')
    .optional()
    .isLength({ min: 3 })
    .withMessage('must have at least 3 characters'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('must have at least 6 characters'),
];

module.exports = {
  UserValidator,
};
