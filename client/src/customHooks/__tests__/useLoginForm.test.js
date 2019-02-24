import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';
import useLoginForm from '../useLoginForm';

let done;
let formState;

beforeEach(() => {
  done = jest.fn();
  /* eslint-disable no-return-assign */
  testHook(() => (formState = useLoginForm(done)));
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
  test('should call passed `done` function on `handleSubmit` if formdata is correct', () => {
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
    expect(done).toHaveBeenCalled();
  });
});
