import React from 'react';
import { mount } from 'enzyme';

import LoginModal from '../LoginModal';

import { testInputFieldsIn } from './testUtils';

describe('<LoginModal /> form', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<LoginModal show toggleModal={toggleModal} />);

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
  const wrapper = mount(<LoginModal show toggleModal={toggleModal} />);
  const inputFields = wrapper.find('input');
  const labels = wrapper.find('label');

  test('should have 3 input fields and labels', () => {
    expect(inputFields.length).toBe(3);
    expect(labels.length).toBe(3);
  });

  test('should autofocus first input field', () => {
    expect(inputFields.at(0).props().autoFocus).toBe(true);
  });

  test('should have email input field with onChange and label', () => {
    const expectedName = 'email';
    const expectedType = 'email';
    const expectedLabel = 'Email';
    testInputFieldsIn(wrapper, 0, { expectedName, expectedType, expectedLabel });
  });

  test('should have password input field with onChange', () => {
    const expectedName = 'password';
    const expectedType = 'password';
    const expectedLabel = 'Password';
    testInputFieldsIn(wrapper, 1, { expectedName, expectedType, expectedLabel });
  });
  test('should have remember me checkbox field with onChange', () => {
    const expectedName = 'remember-me';
    const expectedType = 'checkbox';
    const expectedLabel = 'Remember Me';
    testInputFieldsIn(wrapper, 2, { expectedName, expectedType, expectedLabel });
  });
});

describe('<LoginModal /> contains cancel and submit button', () => {
  const toggleModal = jest.fn();
  const wrapper = mount(<LoginModal show toggleModal={toggleModal} />);
  const buttons = wrapper.find('button');

  test('should contain two buttons', () => {
    expect(buttons.length).toBe(2);
  });

  test('should close modal by calling toggleModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button[data-test="cancel"]');
    cancelBtn.simulate('click');
    expect(toggleModal).toHaveBeenCalledWith('showLoginModal');
  });
});
