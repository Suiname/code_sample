/* eslint-disable */
import React from 'react';
import Search from './Search';
import { configure, shallow, mount } from 'enzyme';

describe('Search Container... ', () => {
  let saved;
  beforeEach(() => {
    saved = {
      wrapper: mount(<Search />),
    }
  });
  afterEach(() => {
    saved.wrapper.unmount();
    saved = {};
  });
  test('with no props given, renders Search container.', () => {
    expect(saved.wrapper).toBeDefined();
    expect(typeof saved.wrapper).toBe('object');
  });
})