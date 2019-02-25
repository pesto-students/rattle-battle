import { postAPI } from './fetch-api';

export const signupAPI = user => postAPI('/api/signup')({ data: user });

export const loginAPI = user => postAPI('/api/login')({ data: user });
