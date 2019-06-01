import React from 'react';
import renderer from 'react-test-renderer';

import Range from './Range';

describe('The Range component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Range max='10' value='3' label='label' onChange={() => 'changed!'} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
