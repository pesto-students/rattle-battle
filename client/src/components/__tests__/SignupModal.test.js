import React from 'react';
import { mount } from 'enzyme';
import { testInputFieldsIn } from './testUtils';

import SignupModal from '../SignupModal';

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
  const labels = wrapper.find('label');

  test('should have 4 input fields with labels', () => {
    expect(inputFields.length).toBe(4);
    expect(labels.length).toBe(4);
  });

  test('should autofocus first input field', () => {
    expect(inputFields.at(0).props().autoFocus).toBe(true);
  });

  test('should have email input field with onChange', () => {
    const index = 0;
    const expectedName = 'email';
    const expectedType = 'email';
    const expectedLabel = 'Email';
    testInputFieldsIn(wrapper, index, { expectedName, expectedType, expectedLabel });
  });
  test('should have username input field with onChange', () => {
    const index = 1;
    const expectedName = 'username';
    const expectedType = 'text';
    const expectedLabel = 'Username';
    testInputFieldsIn(wrapper, index, { expectedName, expectedType, expectedLabel });
  });

  test('should have password input field with onChange', () => {
    const index = 2;
    const expectedName = 'password';
    const expectedType = 'password';
    const expectedLabel = 'Password';
    testInputFieldsIn(wrapper, index, { expectedName, expectedType, expectedLabel });
  });

  test('should have repeat-password input field with onChange', () => {
    const index = 3;
    const expectedName = 'repeat-password';
    const expectedType = 'password';
    const expectedLabel = 'Repeat Password';
    testInputFieldsIn(wrapper, index, { expectedName, expectedType, expectedLabel });
  });
});

describe('<SignupModal /> contains cancel and submit button', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<SignupModal show toggleModal={toggleModal} />);
  const buttons = wrapper.find('button');

  test('should contain two buttons', () => {
    expect(buttons.length).toBe(2);
  });

  test('should close modal by calling toggleModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button[data-test="cancel"]');
    cancelBtn.simulate('click');

    expect(toggleModal).toHaveBeenCalledWith('showSignupModal');
  });
});
