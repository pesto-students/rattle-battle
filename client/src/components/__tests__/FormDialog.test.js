import React from 'react';
import { mount } from 'enzyme';
import FormDialog from '../FormDialog';

describe('<FormDialog />', () => {
  const props = {
    title: 'Some Form',
    show: true,
    handleSubmit: jest.fn(),
    closeModal: jest.fn(),
  };

  const children = <h1>hi</h1>;
  const wrapper = mount(<FormDialog {...props}>{children}</FormDialog>);

  test('should contain title', () => {
    expect(wrapper.contains(props.title)).toBe(true);
  });

  test('should contain <form /> element', () => {
    expect(wrapper.exists('form')).toBe(true);
  });

  test('form should have correct onsubmit method', () => {
    expect(wrapper.find('form').props().onSubmit).toBe(props.handleSubmit);
  });

  test('should trigger handleSubmit on form submission', () => {
    const form = wrapper.find('form');
    form.simulate('submit');
    expect(props.handleSubmit).toHaveBeenCalledTimes(1);
  });

  test('should render the children', () => {
    expect(wrapper.containsMatchingElement(children)).toBe(true);
  });

  test('should contain cancel and submit button', () => {
    const cancelBtn = wrapper.find('button[data-test="cancel"]');
    expect(cancelBtn.text().toLowerCase()).toContain('cancel');
    const submitBtn = wrapper.find('button[data-test="submit"]');
    expect(submitBtn.contains(props.title)).toBe(true);
    expect(submitBtn.props().type).toBe('submit');
  });

  test('should close modal by calling toggleModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button[data-test="cancel"]');
    cancelBtn.simulate('click');

    expect(props.closeModal).toHaveBeenCalled();
  });
});
