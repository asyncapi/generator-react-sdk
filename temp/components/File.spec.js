import React from 'react';
import {describe, expect, test} from '@jest/globals';
import renderer from 'react-test-renderer';
import {Text, File, IndentationTypes, Indent} from '../../index';

describe('<File />', () => {
  test('Should always render as is', () => {
    const defaultProps = {};
    const wrapper = renderer.create(<File {...defaultProps}>Test</File>);
    expect(wrapper).toMatchSnapshot('file_should_render');
  });
  test('Should alwyas render as is with props', () => {
    const defaultProps = {
      name: 'test.ts',
      permissions: '777'
    };
    const wrapper = renderer.create(<File {...defaultProps}>Test</File>);
    expect(wrapper).toMatchSnapshot('file_should_render_as_is_with_props');
  });
  test('Should always be able to render Indent', () => {
    const defaultProps = {};
    const indentProps = {
      size: '4',
      type: IndentationTypes.SPACES
    };
    const wrapper = renderer.create(<File {...defaultProps}><Indent {...indentProps}>Test</Indent></File>);
    expect(wrapper).toMatchSnapshot('file_should_render_text_component');
  });
  test('Should always be able to render Text', () => {
    const defaultProps = {};
    const textProps = {
      size: '4',
      type: IndentationTypes.SPACES
    };
    const wrapper = renderer.create(<File {...defaultProps}><Text {...textProps}>Test</Text></File>);
    expect(wrapper).toMatchSnapshot('file_should_render_text_component');
  });
  test('Should be able to handle wrong props values', () => {
    const defaultProps = {
      size: 'test',
      type: 'someweirdtype'
    };
    expect(() => renderer.create(<File {...defaultProps}>Test</File>)).toThrowErrorMatchingSnapshot('file_with_wrong_props_should_throw_error');
  });
});