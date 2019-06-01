import React from 'react';
import renderer from 'react-test-renderer';

import Select from './Select';

describe('The Select component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Select
          options={['this', 'that', 'the other']}
          value='3'
          label='label'
          onChange={() => 'changed!'}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
