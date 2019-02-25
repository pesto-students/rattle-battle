import Axios from 'axios';
import { signupAPI, loginAPI } from '../auth-api';

jest.mock('axios');
Axios.mockImplementation(() => Promise.resolve());

afterEach(() => {
  Axios.mockClear();
});

describe('Signup API', () => {
  test('should call signup api endpoint with correct configuration', async (done) => {
    const user = { username: '123', password: '123', email: '123@123.com' };
    const requestConfig = { method: 'post', url: '/api/signup', data: user };

    await signupAPI(user);
    expect(Axios).toHaveBeenCalledWith(requestConfig);
    done();
  });
});

describe('Login API', () => {
  test('should call signup api endpoint with correct configuration ', async (done) => {
    const user = { email: '123@123.com', password: '123' };
    const requestConfig = { method: 'post', url: '/api/login', data: user };

    await loginAPI(user);
    expect(Axios).toHaveBeenCalledWith(requestConfig);
    done();
  });
});
