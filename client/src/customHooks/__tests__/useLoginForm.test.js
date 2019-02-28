import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';
import useLoginForm from '../useLoginForm';
import { loginAPI } from '../../utils/auth-api';
import handleSuccess from '../handleFormSuccess';
import handleErrors from '../handleFormErrors';

let callbackForSuccess;
let formState;

jest.mock('../../utils/auth-api');
jest.mock('../handleFormSuccess');
jest.mock('../handleFormErrors');

beforeEach(() => {
  callbackForSuccess = jest.fn();
  /* eslint-disable no-return-assign */
  testHook(() => (formState = useLoginForm(callbackForSuccess)));
});

const expectedTextFieldState = { error: false, helperText: '', value: '' };

describe('useLoginForm hook', () => {
  test('should return all form field states', () => {
    expect(formState.emailState).toMatchObject(expectedTextFieldState);
    expect(formState.passwordState).toMatchObject(expectedTextFieldState);
    expect(formState.rememberMeState).toBeDefined();
  });

  test('remember me should be checked by default', () => {
    expect(formState.rememberMeState.checked).toBe(true);
  });

  test('each field should have an onChange function', () => {
    expect(formState.emailState.onChange).toBeInstanceOf(Function);
    expect(formState.passwordState.onChange).toBeInstanceOf(Function);
    expect(formState.rememberMeState.onChange).toBeInstanceOf(Function);
  });

  test('should return a `handleSubmit` function', () => {
    expect(formState.handleSubmit).toBeInstanceOf(Function);
  });

  test('should change the form state using onChange methods', () => {
    const email = 'nitin@nitin.com';
    const password = '123';

    act(() => {
      formState.emailState.onChange({ target: { value: email } });
      formState.passwordState.onChange({ target: { value: password } });
      formState.rememberMeState.onChange();
    });

    expect(formState.emailState.value).toBe(email);
    expect(formState.passwordState.value).toBe(password);
    expect(formState.rememberMeState.checked).toBe(false);
  });
});

describe('handleSubmit on useLoginForm hook', () => {
  test('should call login API on `handleSubmit` if formdata is correct', () => {
    loginAPI.mockResolvedValue({ data: 'serverresponsedata', headers: { 'x-auth-token': '123' } });
    const email = 'nitin@nitin.com';
    const password = '1234';
    const event = { preventDefault: jest.fn() };

    act(() => {
      formState.emailState.onChange({ target: { value: email } });
      formState.passwordState.onChange({ target: { value: password } });
    });

    act(() => {
      formState.handleSubmit(event);
    });

    expect(event.preventDefault).toHaveBeenCalled();
    return Promise.resolve().then(() => {
      expect(loginAPI).toHaveBeenCalledWith({ email, password });
    });
  });

  test('should call handleSuccess and successCallback if login was successful', (done) => {
    loginAPI.mockResolvedValue({
      data: 'serverresponsedata',
      headers: { 'x-auth-token': '123' },
    });

    handleSuccess.mockImplementation(response => response.data);

    act(() => {
      formState.handleSubmit({ preventDefault: jest.fn() }).then(() => {
        expect(handleSuccess).toHaveBeenCalledWith({
          data: 'serverresponsedata',
          headers: { 'x-auth-token': '123' },
        });

        expect(callbackForSuccess).toHaveBeenCalledWith('serverresponsedata');
        done();
      });
    });
  });

  test('should call handleErrors if login failed', (done) => {
    loginAPI.mockRejectedValue({ errors: 'error' });

    act(() => {
      formState.handleSubmit({ preventDefault: jest.fn() }).then(() => {
        expect(handleErrors).toHaveBeenCalledWith(
          { errors: 'error' },
          {
            form: expect.any(Function),
            email: expect.any(Function),
            password: expect.any(Function),
          },
        );
        done();
      });
    });
  });
});
