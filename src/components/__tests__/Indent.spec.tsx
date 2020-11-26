import React from 'react';
import { IndentationTypes } from '../../utils';
import { Indent, render, Text} from "../..";

describe('<Indent />', () => {
  test('Should always render indentation as is', () => {
    const defaultProps = {};
    const wrapper = render(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render');
  });
  test('Should always render indentation with spaces', () => {
    const defaultProps = {
      size: 4,
      type: IndentationTypes.SPACES
    };
    const wrapper = render(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_space_indentation');
  });
  test('Should always render indentation with tabs', () => {
    const defaultProps = {
      size: 4,
      type: IndentationTypes.TABS
    };
    const wrapper = render(<Indent {...defaultProps}>Test</Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_tab_indentation');
  });
  test('Should be able to nest indentation', () => {
    const defaultProps = {
      size: 4,
      type: IndentationTypes.TABS
    };
    const wrapper = render(<Indent {...defaultProps}><Indent {...defaultProps}>Test</Indent></Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_nested_indentation');
  });
  test('Should be able contain text component', () => {
    const defaultProps = {
      size: 4,
      type: IndentationTypes.TABS
    };
    const defaultTextProps = {
      indent: 4,
      type: IndentationTypes.TABS
    };
    const wrapper = render(<Indent {...defaultProps}><Text {...defaultTextProps}>Test</Text></Indent>);
    expect(wrapper).toMatchSnapshot('indent_should_render_text_component');
  });
});