/* eslint-disable */
import React from 'react';
import Appbar from './Appbar';
import { shallow, mount } from 'enzyme';

describe('AppBar component ...', () => {
  let saved;
  let props;
  beforeEach(() => {
    props = {
      title: 'test string'
    }
    saved = {
      wrapper: shallow(<Appbar {...props} />),
    };
  });
  afterEach(() => {
    saved.wrapper.unmount();
    saved = {};
  })
  test('is a pure functional component.', () => {
    expect(Appbar).toBeInstanceOf(Object);
    expect(typeof Appbar).toBe('function');
  });
  test('renders correctly with required props', () => {
    expect(saved.wrapper).toBeDefined();
    expect(typeof saved.wrapper).toBe("object");
    expect(saved.wrapper.props()).toMatchObject(props);
    saved.wrapper.unmount();
  });
});