import { body, query } from 'express-validator/check';
import { sanitizeQuery } from 'express-validator/filter';

const insertLeaderValidator = [
  body('score')
    .exists()
    .withMessage('is required')
    .isNumeric()
    .withMessage('must be a number'),
];

const getLeadersValidator = [
  query('limit')
    .optional()
    .isNumeric()
    .withMessage('must be a number'),
  sanitizeQuery('limit').toInt(),
];

export {
  insertLeaderValidator,
  getLeadersValidator,
};
