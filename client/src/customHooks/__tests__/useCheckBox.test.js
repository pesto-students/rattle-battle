import { act } from 'react-dom/test-utils';
import { testHook } from './testUtils';

import useCheckBox from '../useCheckBox';

let checkBoxState;
let setCheckBoxState;
const initialCheckedState = true;

beforeEach(() => {
  /* eslint-disable no-return-assign */
  testHook(() => ([checkBoxState, setCheckBoxState] = useCheckBox(initialCheckedState)));
});

describe('useCheckBox hook', () => {
  test('should return checkboxstate and setCheckBoxState', () => {
    expect(checkBoxState).toBeDefined();
    expect(setCheckBoxState).toBeInstanceOf(Function);
  });

  test('checkboxstate should have checked value we passed and onChange method', () => {
    expect(checkBoxState.checked).toBe(initialCheckedState);
    expect(checkBoxState.onChange).toBeInstanceOf(Function);
  });

  test('should change state when onChange is called', () => {
    act(() => {
      checkBoxState.onChange();
    });
    expect(checkBoxState.checked).toBe(false);

    act(() => {
      checkBoxState.onChange();
    });
    expect(checkBoxState.checked).toBe(true);
  });

  test('should change state using the setCheckBoxState method returned', () => {
    act(() => {
      setCheckBoxState(false);
    });

    expect(checkBoxState.checked).toBe(false);

    act(() => {
      setCheckBoxState(true);
    });

    expect(checkBoxState.checked).toBe(true);
  });
});
