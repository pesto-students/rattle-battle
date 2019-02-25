import React from 'react';
import { mount } from 'enzyme';
import { testInputFieldsIn } from './testUtils';

import SignupModal from '../SignupModal';
import { signupAPI } from '../../utils/auth-api';
import handleSuccess from '../../customHooks/handleFormSuccess';

const closeModal = jest.fn();
jest.mock('../../utils/auth-api');
jest.mock('../../customHooks/handleFormSuccess');

describe('<SignupModal/> form', () => {
  const wrapper = mount(<SignupModal show closeModal={closeModal} />);

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
  const wrapper = mount(<SignupModal show closeModal={closeModal} />);
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
  const wrapper = mount(<SignupModal show closeModal={closeModal} />);
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

describe('<SignupModal /> form submission success', () => {
  test('should call signupAPI if form data is correct', () => {
    const wrapper = mount(<SignupModal show closeModal={closeModal} />);
    const mockUser = {
      username: 'nitin',
      email: 'nitin@mail.com',
      password: '123456',
    };

    signupAPI.mockImplementation(user => Promise.resolve(user));

    const usernameInpt = wrapper.find('input[name="username"]');
    const emailInpt = wrapper.find('input[name="email"]');
    const passwordInpt = wrapper.find('input[name="password"]');
    const repeatPasswordInpt = wrapper.find('input[name="repeat-password"]');

    usernameInpt.simulate('change', { target: { value: mockUser.username } });
    emailInpt.simulate('change', { target: { value: mockUser.email } });
    passwordInpt.simulate('change', { target: { value: mockUser.password } });
    repeatPasswordInpt.simulate('change', { target: { value: '123456' } });

    wrapper.find('form').simulate('submit');

    return Promise.resolve().then(() => {
      expect(signupAPI).toHaveBeenCalledWith(mockUser);
      expect(handleSuccess).toHaveBeenCalledWith(mockUser);
    });
  });
});

describe('<SignupModal /> form submission errors', () => {
  test("should set error when passwords don't match", () => {
    const wrapper = mount(<SignupModal show closeModal={closeModal} />);

    wrapper.find('input[name="password"]').simulate('change', { target: { value: '123' } });
    wrapper
      .find('input[name="repeat-password"]')
      .simulate('change', { target: { value: '12345' } });

    wrapper.find('form').simulate('submit');

    const repeatPasswordField = wrapper.find('RequiredFormTextField[name="repeat-password"]');
    expect(repeatPasswordField.props().error).toBe(true);
    expect(repeatPasswordField.props().helperText).toBe('Passwords do not match');
  });
});
