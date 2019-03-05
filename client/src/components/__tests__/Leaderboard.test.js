import React from 'react';
import { mount } from 'enzyme';
import Leaderboard from '../Leaderboard';

jest.mock('../../utils/leaderboard-api');

describe('<Leaderboard />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<Leaderboard limit={5} />);
  });

  it('should return null when there are no leaderboards', () => {
    expect(wrapper.html()).toBeNull();
  });

  it('should return a table when there are leaderboards', () => {
    const leaderboardTable = wrapper.find('table');
    expect(leaderboardTable).not.toBeNull();
  });
});
