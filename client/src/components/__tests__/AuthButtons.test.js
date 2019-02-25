import React from 'react';
import { mount } from 'enzyme';
import AuthButtons from '../AuthButtons';
import { MockUserProvider } from './testUtils';

describe('<AuthButtons />', () => {
  test('should show logout button if user is passed in provider', () => {
    const mockUser = { id: '123', username: '123' };
    const logout = jest.fn();
    const wrapper = mount(
      <MockUserProvider user={mockUser} logout={logout}>
        <AuthButtons />
      </MockUserProvider>,
    );

    expect(wrapper.exists('LogoutButton')).toBe(true);
    expect(wrapper.find('LogoutButton').props().logout).toBe(logout);
    expect(wrapper.find('LogoutButton').props().user).toBe(mockUser);
  });

  test('should show auth buttons user is null', () => {
    const wrapper = mount(
      <MockUserProvider user={null}>
        <AuthButtons />
      </MockUserProvider>,
    );

    expect(wrapper.find('button[data-test="login"]').text()).toBe('Login');
    expect(wrapper.find('button[data-test="signup"]').text()).toBe('Signup');
  });

  test('should show <SignupModal /> form after clicking signup button', () => {
    const wrapper = mount(<AuthButtons />);
    const signupBtn = wrapper.find('button[data-test="signup"]');
    expect(wrapper.find('SignupModal').length).toBe(1);
    expect(wrapper.find('SignupModal').props().show).toBe(false);
    signupBtn.simulate('click');
    expect(wrapper.find('SignupModal').props().show).toBe(true);
  });

  test('should show <LoginModal /> form after clicking login button', () => {
    const wrapper = mount(<AuthButtons />);
    const loginbtn = wrapper.find('button[data-test="login"]');
    expect(wrapper.find('LoginModal').length).toBe(1);
    expect(wrapper.find('LoginModal').props().show).toBe(false);
    loginbtn.simulate('click');
    expect(wrapper.find('LoginModal').props().show).toBe(true);
  });
});
