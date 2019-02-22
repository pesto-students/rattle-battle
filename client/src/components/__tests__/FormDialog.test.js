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
    const buttons = wrapper.find('button');
    expect(
      buttons
        .at(0)
        .text()
        .toLowerCase(),
    ).toContain('cancel');

    expect(buttons.at(1).contains(props.title)).toBe(true);
    expect(buttons.at(1).props().type).toBe('submit');
  });

  test('should close modal by calling toggleModal on clicking cancel button', () => {
    const cancelBtn = wrapper.find('button').at(0);
    cancelBtn.simulate('click');

    expect(props.closeModal).toHaveBeenCalled();
  });
});
