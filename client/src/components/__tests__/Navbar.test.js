import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Navbar from '../Navbar';

Enzyme.configure({ adapter: new Adapter() });

describe('<Navbar />', () => {
  const title = 'Rattle Battle';

  it('should contain the app title in h2', () => {
    const wrapper = mount(<Navbar />);

    expect(wrapper.exists('h2')).toBe(true);

    const h2 = wrapper.find('h2');
    expect(h2.contains(title)).toBe(true);
  });
});
