import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';
import useSignupForm from '../useSignupForm';
import { signupAPI } from '../../utils/auth-api';
import handleErrors from '../handleFormErrors';
import handleSuccess from '../handleFormSuccess';

let callbackForSignupSuccess;
let formState;
jest.mock('../../utils/auth-api');
jest.mock('../handleFormErrors');
jest.mock('../handleFormSuccess');

beforeEach(() => {
  callbackForSignupSuccess = jest.fn();
  signupAPI.mockClear();
  /* eslint-disable no-return-assign */
  testHook(() => (formState = useSignupForm(callbackForSignupSuccess)));
});

const expectedTextFieldState = { error: false, helperText: '', value: '' };

describe('useSignupForm hook', () => {
  test('should return all form field states', () => {
    expect(formState.emailState).toMatchObject(expectedTextFieldState);
    expect(formState.passwordState).toMatchObject(expectedTextFieldState);
    expect(formState.usernameState).toMatchObject(expectedTextFieldState);
    expect(formState.repeatPasswordState).toMatchObject(expectedTextFieldState);
  });

  test('each field should have an onChange function', () => {
    expect(formState.emailState.onChange).toBeInstanceOf(Function);
    expect(formState.passwordState.onChange).toBeInstanceOf(Function);
    expect(formState.usernameState.onChange).toBeInstanceOf(Function);
    expect(formState.repeatPasswordState.onChange).toBeInstanceOf(Function);
  });

  test('should return a `handleSubmit` function', () => {
    expect(formState.handleSubmit).toBeInstanceOf(Function);
  });

  test('should change the form state using onChange methods', () => {
    const email = 'nitin@nitin.com';
    const username = 'nitin';
    const password = '123';
    const repeatPassword = '1234';

    act(() => {
      formState.emailState.onChange({ target: { value: email } });
      formState.usernameState.onChange({ target: { value: username } });
      formState.passwordState.onChange({ target: { value: password } });
      formState.repeatPasswordState.onChange({ target: { value: repeatPassword } });
    });

    expect(formState.emailState.value).toBe(email);
    expect(formState.usernameState.value).toBe(username);
    expect(formState.passwordState.value).toBe(password);
    expect(formState.repeatPasswordState.value).toBe(repeatPassword);
  });
});

describe('handleSubmit on useSignupForm hook', () => {
  test('should call signupAPI on `handleSubmit` if formdata is correct', (done) => {
    const email = 'nitin@nitin.com';
    const username = 'nitin';
    const password = '1234';
    const repeatPassword = '1234';
    const event = { preventDefault: jest.fn() };

    signupAPI.mockImplementation(user => Promise.resolve(user));
    act(() => {
      formState.emailState.onChange({ target: { value: email } });
      formState.usernameState.onChange({ target: { value: username } });
      formState.passwordState.onChange({ target: { value: password } });
      formState.repeatPasswordState.onChange({ target: { value: repeatPassword } });
    });

    act(() => {
      formState.handleSubmit(event).then(() => {
        expect(event.preventDefault).toHaveBeenCalled();
        expect(signupAPI).toHaveBeenCalledWith({ username, password, email });
        expect(handleSuccess).toHaveBeenCalled();
        expect(callbackForSignupSuccess).toHaveBeenCalled();
        done();
      });
    });
  });

  describe('Form submission errors', () => {
    test('should set error when password and repeat password do not match ', () => {
      const email = 'nitin@nitin.com';
      const username = 'nitin';
      const password = '123';
      const repeatPassword = '12345';
      const event = { preventDefault: jest.fn() };

      act(() => {
        formState.emailState.onChange({ target: { value: email } });
        formState.usernameState.onChange({ target: { value: username } });
        formState.passwordState.onChange({ target: { value: password } });
        formState.repeatPasswordState.onChange({ target: { value: repeatPassword } });
      });

      act(() => {
        formState.handleSubmit(event);
      });

      expect(event.preventDefault).toHaveBeenCalled();
      expect(formState.repeatPasswordState.error).toBe(true);
      expect(formState.repeatPasswordState.helperText).toBe('Passwords do not match');
      expect(signupAPI).not.toHaveBeenCalled();
    });

    test('should call handleErrors on fail response from signupAPI', (done) => {
      const error = { errors: ['err1', 'err2', 'err3'] };
      signupAPI.mockRejectedValue(error);

      const email = 'nitin@nitin.com';
      const username = 'nitin';
      const password = '1234';
      const repeatPassword = '1234';

      act(() => {
        formState.emailState.onChange({ target: { value: email } });
        formState.usernameState.onChange({ target: { value: username } });
        formState.passwordState.onChange({ target: { value: password } });
        formState.repeatPasswordState.onChange({ target: { value: repeatPassword } });
      });

      return act(() => {
        formState.handleSubmit({ preventDefault: jest.fn() }).then(() => {
          expect(handleErrors).toHaveBeenCalled();
          const args = handleErrors.mock.calls[0];
          expect(args[0]).toEqual(error);
          expect(args[1]).toMatchObject({
            password: expect.any(Function),
            username: expect.any(Function),
            email: expect.any(Function),
            repeatPassword: expect.any(Function),
            form: expect.any(Function),
          });
          done();
        });
      });
    });
  });
});
