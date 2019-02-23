import { postAPI } from './fetch-api';

export const signup = user => postAPI('/api/signup')({ data: user });

export const login = user => postAPI('/api/login')({ data: user });
