import jwt from 'express-jwt';
import { JWT_SECRET } from '../app/appConstants';

const isAuthenticated = jwt({ secret: JWT_SECRET });

export default isAuthenticated;
