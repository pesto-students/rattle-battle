import handleErrors from '../handleFormErrors';

beforeEach(() => {
  jest.resetAllMocks();
});

const setPasswordErr = jest.fn();
const setUsernameErr = jest.fn();
const setEmailErr = jest.fn();
const setFormErr = jest.fn();

const setErrors = {
  password: setPasswordErr,
  username: setUsernameErr,
  email: setEmailErr,
  form: setFormErr,
};

describe('handleFormErrors', () => {
  test('should call setError when errors array is sent', () => {
    const err = {
      errors: [
        { msg: 'invalid password', param: 'password' },
        { msg: 'invalid email', param: 'email' },
        { msg: 'invalid username', param: 'username' },
      ],
    };

    handleErrors(err, setErrors);

    expect(setErrors.password).toHaveBeenCalledWith('invalid password');
    expect(setErrors.email).toHaveBeenCalledWith('invalid email');
    expect(setErrors.username).toHaveBeenCalledWith('invalid username');
  });

  test('should call setFormError if errors string is sent', () => {
    const err = { errors: 'try again' };
    handleErrors(err, setErrors);
    expect(setErrors.form).toHaveBeenCalledWith('try again');
  });

  test('should handle unknown errors', () => {
    const err = 'unknowin error';
    handleErrors(err, setErrors);
    expect(setErrors.form).toHaveBeenCalledWith(
      "Something wen't wrong. Please contact the developer.",
    );
  });
});
