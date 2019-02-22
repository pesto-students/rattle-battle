import React from 'react';
import { mount, shallow } from 'enzyme';

import RequiredFormTextField from '../RequiredFormTextField';

describe('<RequiredFormTextField/>', () => {
  const requiredProps = { name: 'email', type: 'email', label: 'Email' };

  test('should return an <input> element', () => {
    const wrapper = mount(<RequiredFormTextField {...requiredProps} />);
    expect(wrapper.exists('input')).toBe(true);
  });

  test('should return <input> with required prop', () => {
    const wrapper = mount(<RequiredFormTextField {...requiredProps} />);
    expect(wrapper.find('input').props().required).toBe(true);
  });

  test('should pass props to TextField', () => {
    const props = { a: '123', b: '345' };
    const wrapper = shallow(<RequiredFormTextField {...requiredProps} {...props} />);
    const TextField = wrapper.find('TextField');
    expect(TextField.props()).toMatchObject(props);
  });

  test('should called passed onChange when toggled', () => {
    const props = { type: 'text', value: '', onChange: jest.fn() };
    const wrapper = mount(<RequiredFormTextField {...requiredProps} {...props} />);
    const input = wrapper.find('input');
    input.simulate('change');
    expect(props.onChange).toHaveBeenCalled();
  });
});
