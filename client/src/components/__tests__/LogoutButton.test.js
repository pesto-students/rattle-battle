import React from 'react';
import { mount } from 'enzyme';

import LogoutButton from '../LogoutButton';

const user = { username: '123', id: '123' };
const logout = jest.fn();
const wrapper = mount(<LogoutButton user={user} logout={logout} />);

describe('<LogoutButton />', () => {
  test('should return a logout button', () => {
    expect(wrapper.exists('button')).toBe(true);
    expect(wrapper.find('button').text()).toBe('Logout');
  });

  test('should contain username', () => {
    expect(wrapper.text()).toContain(user.username);
  });

  test('should call logout function on clicking logout', () => {
    const logoutBtn = wrapper.find('button');
    expect(logoutBtn.props().onClick).toBe(logout);
    logoutBtn.simulate('click');
    expect(logout).toHaveBeenCalled();
  });
});
