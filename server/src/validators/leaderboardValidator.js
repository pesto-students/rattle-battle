import { body } from 'express-validator/check';

const leaderboardValidator = [
  body('score')
    .exists()
    .withMessage('is required')
    .isNumeric()
    .withMessage('must be a number'),
];

export default leaderboardValidator;
