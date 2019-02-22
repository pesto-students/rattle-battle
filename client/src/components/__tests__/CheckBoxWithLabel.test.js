import React from 'react';
import { mount } from 'enzyme';

import CheckBoxWithLabel from '../CheckBoxWithLabel';

describe('<CheckBoxWithLabel />', () => {
  const requiredProps = { name: 'remember-me', label: 'Remember Me' };
  test('should return an <input> of type checkbox', () => {
    const wrapper = mount(<CheckBoxWithLabel {...requiredProps} />);

    expect(wrapper.exists('input')).toBe(true);
    expect(wrapper.find('input').props().type).toBe('checkbox');
  });

  test('checkbox should have passed props', () => {
    const props = { a: 123, b: 345, c: 678 };
    const wrapper = mount(<CheckBoxWithLabel {...requiredProps} {...props} />);
    expect(wrapper.find('Checkbox').props()).toMatchObject(props);
  });

  test('should have passed label', () => {
    const wrapper = mount(<CheckBoxWithLabel {...requiredProps} />);
    expect(wrapper.find('label').text()).toBe(requiredProps.label);
  });

  test('should called passed onChange when toggled', () => {
    const props = { checked: true, onChange: jest.fn() };
    const wrapper = mount(<CheckBoxWithLabel {...requiredProps} {...props} />);
    const checkbox = wrapper.find('input');
    checkbox.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
});
