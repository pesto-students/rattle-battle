import { body } from 'express-validator/check';

const userValidator = (options = {}) => {
  const { usernameRequired = true } = options;

  const validators = [
    body('email')
      .isEmail()
      .withMessage('must be a valid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('must have at least 6 characters'),
  ];

  if (usernameRequired) {
    validators.push(body('username')
      .isLength({ min: 3 })
      .withMessage('must have at least 3 characters'));
  }

  return validators;
};

export default userValidator;
