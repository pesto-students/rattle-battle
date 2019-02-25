import { body } from 'express-validator/check';

const loginValidator = [
  body('email')
    .isEmail()
    .withMessage('must be a valid email'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('must have at least 6 characters'),
];

export default loginValidator;
