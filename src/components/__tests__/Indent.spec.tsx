import React from 'react';
import { Indent, render } from "../..";

describe('<Indent />', () => {
  test('should render given indendations', () => {
    const content = render(<Indent size={4}>Test</Indent>);
    expect(content).toEqual("    Test");
  });
});
