import 'jest-localstorage-mock';
import handleSuccess from '../handleFormSuccess';

describe('handleFormSuccess', () => {
  const user = { username: '123', id: '123' };
  const token = 'abc123';
  const response = { data: user, headers: { 'x-auth-token': token } };

  test('should set token in localstorage', () => {
    handleSuccess(response);
    expect(localStorage.setItem).toHaveBeenCalledWith('token', token);
  });

  test('should return the data property from response', () => {
    expect(handleSuccess(response)).toBe(user);
  });
});
