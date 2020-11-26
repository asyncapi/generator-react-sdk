import React from 'react';
import {describe, expect, test} from '@jest/globals';
import renderer from 'react-test-renderer';
import {Text, IndentationTypes, Indent} from '../../index';

describe('<Indent />', () => {
  test('Should always render indentation as is', () => {
    const defaultProps = {};
    const wrapper = renderer.create(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render');
  });
  test('Should always render indentation with spaces', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.SPACES
    };
    const wrapper = renderer.create(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_space_indentation');
  });
  test('Should always render indentation with tabs', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.TABS
    };
    const wrapper = renderer.create(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_tab_indentation');
  });
  test('Should be able to nest indentation', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.TABS
    };
    const wrapper = renderer.create(<Indent {...defaultProps}><Indent {...defaultProps}>Test</Indent></Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_nested_indentation');
  });
  test('Should be able contain text component', () => {
    const defaultProps = {
      size: '4',
      type: IndentationTypes.TABS
    };
    const wrapper = renderer.create(<Indent {...defaultProps}><Text {...defaultProps}>Test</Text></Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_text_component');
  });
  test('Should be able to handle wrong props values', () => {
    const defaultProps = {
      size: 'test',
      type: 'someweirdtype'
    };
    expect(() => renderer.create(<Indent {...defaultProps}>Test</Indent>)).toThrowErrorMatchingSnapshot('indent_with_wrong_props_should_throw_error');
  });
});