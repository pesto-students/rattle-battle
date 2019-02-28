import jwt from 'jsonwebtoken';
import {
  JWT_SECRET,
  JWT_DURATION,
} from '../app/appConstants';
/* eslint-disable import/prefer-default-export */
export const generateJWT = payload => jwt.sign(
  payload,
  JWT_SECRET,
  {
    expiresIn: JWT_DURATION,
  },
);
