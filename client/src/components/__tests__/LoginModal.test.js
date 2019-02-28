import React from 'react';
import { mount } from 'enzyme';

import LoginModal from '../LoginModal';

import { testInputFieldsIn } from './testUtils';
import { loginAPI } from '../../utils/auth-api';
import handleSuccess from '../../customHooks/handleFormSuccess';

jest.mock('../../utils/auth-api');
jest.mock('../../customHooks/handleFormSuccess');

describe('<LoginModal /> form', () => {
  const closeModal = jest.fn();
  const wrapper = mount(<LoginModal show closeModal={closeModal} />);

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
  const closeModal = jest.fn();
  const wrapper = mount(<LoginModal show closeModal={closeModal} />);
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
  const closeModal = jest.fn();
  const wrapper = mount(<LoginModal show closeModal={closeModal} />);
  const buttons = wrapper.find('button');

  test('should contain two buttons', () => {
    expect(buttons.length).toBe(2);
  });

  test('should close modal by calling closeModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button[data-test="cancel"]');
    cancelBtn.simulate('click');
    expect(closeModal).toHaveBeenCalled();
  });
});

describe('<LoginModal/> form submission', () => {
  test('should call loginAPI on form submission', () => {
    const closeModal = jest.fn();
    const wrapper = mount(<LoginModal show closeModal={closeModal} />);
    const mockUser = {
      email: 'nitin@mail.com',
      password: '123456',
    };

    loginAPI.mockImplementation(user => Promise.resolve(user));

    const emailInpt = wrapper.find('input[name="email"]');
    const passwordInpt = wrapper.find('input[name="password"]');

    emailInpt.simulate('change', { target: { value: mockUser.email } });
    passwordInpt.simulate('change', { target: { value: mockUser.password } });

    wrapper.find('form').simulate('submit');

    return Promise.resolve().then(() => {
      expect(loginAPI).toHaveBeenCalledWith(mockUser);
      expect(handleSuccess).toHaveBeenCalledWith(mockUser);
    });
  });
});
