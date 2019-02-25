import { body } from 'express-validator/check';
import { checkUserExists } from '../utils/validateUtils';

const signupValidator = [
  body('email')
    .isEmail()
    .withMessage('must be a valid email')
    .custom(email => checkUserExists({ email }))
    .withMessage('is already taken'),
  body('username')
    .isLength({ min: 3 })
    .withMessage('must have at least 3 characters')
    .custom(username => checkUserExists({ username }))
    .withMessage('is already taken'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('must have at least 6 characters'),
];

export default signupValidator;
