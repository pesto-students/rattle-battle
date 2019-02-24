import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';
import useFormTextField from '../useFormTextField';

const initialState = { error: false, errorMsg: '', value: '' };
let state;
let seterror;

beforeEach(() => {
  /* eslint-disable no-return-assign */
  testHook(() => ([state, seterror] = useFormTextField(initialState)));
});

describe('useFormTextField hook', () => {
  test('should return state and seterror function', () => {
    expect(state.onChange).toBeInstanceOf(Function);
    expect(state.error).toBe(false);
    expect(state.helperText).toBe('');
    expect(state.value).toBe('');
    expect(seterror).toBeInstanceOf(Function);
  });

  test('should update value when `onChange` is called', () => {
    const event = { target: { value: 'somerandomstring' } };
    act(() => {
      state.onChange(event);
    });
    expect(state.value).toBe(event.target.value);
  });

  test('should set error and helperText when seterror is called', () => {
    const errorMsg = 'incorrect, please try again';
    act(() => {
      seterror(errorMsg);
    });
    expect(state.error).toBe(true);
    expect(state.helperText).toBe(errorMsg);
  });
});
