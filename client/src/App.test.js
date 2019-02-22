import React from 'react';
import { shallow } from 'enzyme';
import App from './App';

describe('<App/>', () => {
  test('renders without crashing', () => {
    shallow(<App />);
  });

  test('should contain loggedInUser state', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.state().loggedInUser).toBeDefined();
  });
});
