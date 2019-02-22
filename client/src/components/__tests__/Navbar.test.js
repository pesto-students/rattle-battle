import React from 'react';
import { mount } from 'enzyme';

import Navbar from '../Navbar';

describe('<Navbar />', () => {
  const title = 'Rattle Battle';

  test('should contain the app title in h2', () => {
    const wrapper = mount(<Navbar />);

    expect(wrapper.exists('h2')).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.contains(title)).toBe(true);
  });

  test('should show username if loggedInUser is passed in props', () => {
    const user = { _id: '123', username: 'nitin', email: 'lol@gmail.com' };
    const wrapper = mount(<Navbar loggedInUser={user} />);
    expect(wrapper.text()).toContain(user.username);
    expect(wrapper.find('button').length).toBe(0);
  });

  test('should show auth buttons loggedInUser if user is null', () => {
    const wrapper = mount(<Navbar loggedInUser={null} />);

    const buttons = wrapper.find('button');
    expect(buttons.length).toBe(2);

    expect(
      buttons
        .at(0)
        .text()
        .toLowerCase(),
    ).toContain('signup');

    expect(
      buttons
        .at(1)
        .text()
        .toLowerCase(),
    ).toContain('login');
  });

  test('should show <SignupModal /> form after clicking signup button', () => {
    const wrapper = mount(<Navbar loggedInUser={null} />);
    const buttons = wrapper.find('button');
    const signupBtn = buttons.at(0);
    expect(wrapper.find('SignupModal').length).toBe(1);
    expect(wrapper.find('SignupModal').props().show).toBe(false);
    signupBtn.simulate('click');
    expect(wrapper.find('SignupModal').props().show).toBe(true);
  });
});
