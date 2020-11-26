import React from 'react';
import { IndentationTypes } from '../../utils';
import { Text, render } from "../..";

describe('<Text />', () => {
  test('Should always render text as is', () => {
    const defaultProps = {};
    const wrapper = render(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render');
  });
  test('Should always render indentation with spaces', () => {
    const defaultProps = {
      indent: 4,
      type: IndentationTypes.SPACES
    };
    const wrapper = render(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render_space_indentation');
  });
  test('Should always render indentation with tabs', () => {
    const defaultProps = {
      indent: 4,
      type: IndentationTypes.TABS
    };
    const wrapper = render(<Text {...defaultProps}>Test</Text>);
    expect(wrapper).toMatchSnapshot('text_should_render_tab_indentation');
  });
});