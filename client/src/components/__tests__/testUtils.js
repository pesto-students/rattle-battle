import React from 'react';
import UserContext from '../../utils/user-context';

export const testInputFieldsIn = (
  wrapper,
  index,
  { expectedName, expectedType, expectedLabel },
) => {
  const inputFields = wrapper.find('input');
  const labels = wrapper.find('label');
  const { name, type, onChange } = inputFields.at(index).props();
  const labelText = labels.at(index).text();
  expect(name).toBe(expectedName);
  expect(type).toBe(expectedType);
  expect(labelText).toContain(expectedLabel);
  expect(onChange).toBeInstanceOf(Function);
};

/* eslint-disable react/prop-types  */
export const MockUserProvider = ({ children, ...otherProps }) => (
  <UserContext.Provider value={otherProps}>{children}</UserContext.Provider>
);
