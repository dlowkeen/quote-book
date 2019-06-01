import React from 'react';
import renderer from 'react-test-renderer';

import Text from './Text';

describe('The Text component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(<Text label='i have something i need to tell you' />)
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
