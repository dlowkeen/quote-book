import React from 'react';
import renderer from 'react-test-renderer';

import Textarea from './Textarea';

describe('The Textarea component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Textarea
          label='i have something i need to tell you'
          name='george'
          handleChange={() => 'handled'}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
