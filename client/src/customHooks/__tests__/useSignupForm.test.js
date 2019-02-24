import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';
import useSignupForm from '../useSignupForm';

let done;
let formState;

beforeEach(() => {
  done = jest.fn();
  /* eslint-disable no-return-assign */
  testHook(() => (formState = useSignupForm(done)));
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
  test('should call passed `done` function on `handleSubmit` if formdata is correct', () => {
    const email = 'nitin@nitin.com';
    const username = 'nitin';
    const password = '1234';
    const repeatPassword = '1234';
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
    expect(done).toHaveBeenCalled();
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
      expect(done).not.toHaveBeenCalled();
    });
  });
});
