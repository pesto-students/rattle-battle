import React from 'react';
import { mount, shallow } from 'enzyme';
import { sign } from 'jsonwebtoken';
import 'jest-localstorage-mock';
import App from './App';

const checkUnAuthenticatedUser = ({ state }) => {
  expect(state.user).toBe(null);
  expect(localStorage.removeItem).toHaveBeenCalledWith('token');
};

beforeEach(() => localStorage.removeItem.mockClear());

describe('<App/>', () => {
  test('renders without crashing', () => {
    shallow(<App />);
  });

  test('should contain user state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().user).toBeDefined();
  });

  test('should login user if there is a valid token and is not expired', () => {
    const mockToken = sign({ username: 'abc', id: '123' }, 'secret', { expiresIn: 60 * 60 });
    localStorage.setItem('token', mockToken);
    const wrapper = mount(<App />);
    expect(wrapper.state().user).toEqual({ username: 'abc', id: '123' });
  });

  test('should remove token from localstorage if token is invalid', () => {
    localStorage.setItem('token', 'invalidtoken');
    const wrapper = mount(<App />);
    checkUnAuthenticatedUser({ state: wrapper.state() });
  });

  test('should remove token from localstorage if token is expired', (done) => {
    const mockToken = sign({ username: 'abc', id: '123' }, 'secret', { expiresIn: '1' });
    localStorage.setItem('token', mockToken);

    setTimeout(() => {
      const wrapper = mount(<App />);
      checkUnAuthenticatedUser({ state: wrapper.state() });
      done();
    }, 5);
  });

  test('should logout user on clicking logout button', () => {
    const mockToken = sign({ username: 'abc', id: '123' }, 'secret', { expiresIn: 60 * 60 });
    localStorage.setItem('token', mockToken);
    const wrapper = mount(<App />);
    expect(wrapper.state().user).toEqual({ username: 'abc', id: '123' });

    const logoutbtn = wrapper.find('button[data-test="logout"]');
    logoutbtn.simulate('click');
    checkUnAuthenticatedUser({ state: wrapper.state() });
  });
});
