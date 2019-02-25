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

  test('should contain <AuthButtons />', () => {
    const wrapper = mount(<Navbar />);
    expect(wrapper.exists('AuthButtons')).toBe(true);
  });
});
