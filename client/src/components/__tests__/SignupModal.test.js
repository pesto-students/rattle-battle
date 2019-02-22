import React from 'react';
import { mount } from 'enzyme';

import SignupModal from '../SignupModal';

const testInputFieldsIn = (InputFields, index, { expectedName, expectedType }) => {
  const { name, type, onChange } = InputFields.at(index).props();
  expect(name).toBe(expectedName);
  expect(type).toBe(expectedType);
  expect(onChange).toBeInstanceOf(Function);
};

describe('<SignupModal/> form', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<SignupModal show toggleModal={toggleModal} />);

  test('should return <FormDialog /> component', () => {
    expect(wrapper.exists('FormDialog')).toBe(true);
  });

  test('should contain <form /> element', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  test('form should have onsubmit method', () => {
    expect(wrapper.find('form').props().onSubmit).toBeInstanceOf(Function);
  });
});

describe('input fields in form', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<SignupModal show toggleModal={toggleModal} />);
  const inputFields = wrapper.find('input');

  test('should have 4 input fields', () => {
    expect(inputFields.length).toBe(4);
  });

  test('should have email input field with onChange', () => {
    const index = 0;
    const expectedName = 'email';
    const expectedType = 'email';
    testInputFieldsIn(inputFields, index, { expectedName, expectedType });
  });
  test('should have username input field with onChange', () => {
    const index = 1;
    const expectedName = 'username';
    const expectedType = 'text';
    testInputFieldsIn(inputFields, index, { expectedName, expectedType });
  });

  test('should have password input field with onChange', () => {
    const index = 2;
    const expectedName = 'password';
    const expectedType = 'password';
    testInputFieldsIn(inputFields, index, { expectedName, expectedType });
  });

  test('should have repeat-password input field with onChange', () => {
    const index = 3;
    const expectedName = 'repeat-password';
    const expectedType = 'password';
    testInputFieldsIn(inputFields, index, { expectedName, expectedType });
  });
});

describe('<SignupModal /> contains cancel and submit button', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<SignupModal show toggleModal={toggleModal} />);
  const buttons = wrapper.find('button');

  test('should contain two buttons', () => {
    expect(buttons.length).toBe(2);
  });

  test('should contain cancel and submit button', () => {
    expect(
      buttons
        .at(0)
        .text()
        .toLowerCase(),
    ).toContain('cancel');

    expect(
      buttons
        .at(1)
        .text()
        .toLowerCase(),
    ).toContain('sign up');

    expect(buttons.at(1).props().type).toBe('submit');
  });

  test('should close modal by calling toggleModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button').at(0);
    cancelBtn.simulate('click');

    expect(toggleModal).toHaveBeenCalledWith('showSignupModal');
  });
});
