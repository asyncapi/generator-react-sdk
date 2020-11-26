import React from 'react';
import { Text, render } from "../..";

describe('<Text />', () => {
  test('should render text as is', () => {
    const content = render(<Text>Test</Text>);
    expect(content).toEqual("Test\n");
  });
});
