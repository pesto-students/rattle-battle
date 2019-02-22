/* eslint-disable import/prefer-default-export */
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
