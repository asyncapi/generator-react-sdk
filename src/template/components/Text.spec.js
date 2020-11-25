import React from 'react';
import {describe, expect, test} from '@jest/globals';
import renderer from 'react-test-renderer';
import {Text, IndentationTypes} from '../../index';

describe('<Text />', () => {
  test('Should always render text as is', () => {
    const defaultProps = {};
    const wrapper = renderer.create(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render');
  });
  test('Should always render indentation with spaces', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.SPACES
    };
    const wrapper = renderer.create(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render_space_indentation');
  });
  test('Should always render indentation with tabs', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.TABS
    };
    const wrapper = renderer.create(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render_tab_indentation');
  });
  test('Should be able to handle wrong props values', () => {
    const defaultProps = {
      size: 'test',
      type: 'someweirdtype'
    };
    expect(() => renderer.create(<Text {...defaultProps}>Test</Text>)).toThrowErrorMatchingSnapshot('text_with_wrong_props_should_throw_error');
  });
});