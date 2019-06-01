import React from 'react';
import renderer from 'react-test-renderer';

import Dollar from './Dollar';

describe('The Dollar component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Dollar max='10' value='3' label='label' onChange={() => 'changed!'} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
