import React from 'react';
import { IndentationTypes } from '../../utils';
import {Text, File, Indent, render} from '../../';

describe('<File />', () => {
  test('Should always render as is', () => {
    const defaultProps = {};
    const wrapper = render(<File {...defaultProps}>Test</File>);
    expect(wrapper).toMatchSnapshot('file_should_render');
  });
  test('Should alwyas render as is with props', () => {
    const defaultProps = {
      name: 'test.ts',
      permissions: 0o777
    };
    const wrapper = render(<File {...defaultProps}>Test</File>);
    expect(wrapper).toMatchSnapshot('file_should_render_as_is_with_props');
  });
  test('Should always be able to render Indent', () => {
    const defaultProps = {};
    const indentProps = {
      size: 4,
      type: IndentationTypes.SPACES
    };
    const wrapper = render(<File {...defaultProps}><Indent {...indentProps}>Test</Indent></File>);
    expect(wrapper).toMatchSnapshot('file_should_render_text_component');
  });
  test('Should always be able to render Text', () => {
    const defaultProps = {};
    const textProps = {
      indent: 4,
      type: IndentationTypes.SPACES
    };
    const wrapper = render(<File {...defaultProps}><Text {...textProps}>Test</Text></File>);
    expect(wrapper).toMatchSnapshot('file_should_render_text_component');
  });
});