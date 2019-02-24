import React from 'react';
import { mount } from 'enzyme';

const TestHook = ({ callback }) => {
  callback();
  return null;
};

/* eslint-disable import/prefer-default-export */
export const testHook = (callback) => {
  mount(<TestHook callback={callback} />);
};
