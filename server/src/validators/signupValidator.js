import { body } from 'express-validator/check';
import { checkUniqueUser } from '../utils/validateUtils';

const signupValidator = [
  body('email')
    .isEmail()
    .withMessage('must be a valid email')
    .custom(email => checkUniqueUser({ email }))
    .withMessage('is already taken'),
  body('username')
    .isLength({ min: 3 })
    .withMessage('must have at least 3 characters')
    .custom(username => checkUniqueUser({ username }))
    .withMessage('is already taken'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('must have at least 6 characters'),
];

export default signupValidator;
