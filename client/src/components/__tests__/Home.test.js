import React from 'react';
import { mount } from 'enzyme';
import Home from '../Home';

describe('<Home/>', () => {
  test('should contain 2 buttons', () => {
    const wrapper = mount(<Home />);
    const buttons = wrapper.find('button');
    expect(buttons).toHaveLength(2);
  });

  test('buttons should contain play and find a friend', () => {
    const wrapper = mount(<Home />);
    const buttons = wrapper.find('button');
    const play = buttons.at(0);
    const findAFriend = buttons.at(1);
    expect(play.text()).toContain('Play');
    expect(findAFriend.text()).toContain('Find a Friend');
  });
});
