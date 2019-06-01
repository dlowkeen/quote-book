import React from 'react';
import renderer from 'react-test-renderer';

import Number from './Number';

describe('The Number component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Number max='10' value='3' label='label' onChange={() => 'changed!'} />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
