import React from 'react';
import { mount } from 'enzyme';
import AuthButtons from '../AuthButtons';

describe('<AuthButtons />', () => {
  test('should contain login button and signup button', () => {
    const toggleModal = jest.fn();
    const wrapper = mount(<AuthButtons toggleModal={toggleModal} />);
    const buttons = wrapper.find('button');

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

  test('should open correct modal on clicking sign up', () => {
    const toggleModal = jest.fn();
    const wrapper = mount(<AuthButtons toggleModal={toggleModal} />);
    const buttons = wrapper.find('button');
    const loginButton = buttons.at(0);

    loginButton.simulate('click');

    expect(toggleModal).toHaveBeenCalledWith('showSignupModal');
  });

  test('should open correct modal on clicking login', () => {
    const toggleModal = jest.fn();
    const wrapper = mount(<AuthButtons toggleModal={toggleModal} />);
    const buttons = wrapper.find('button');
    const signupButton = buttons.at(1);

    signupButton.simulate('click');

    expect(toggleModal).toHaveBeenCalledWith('showLoginModal');
  });
});
