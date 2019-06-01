import React from 'react';
import renderer from 'react-test-renderer';

import Button from './Button';

describe('The Button component', () => {
  it('renders as expected', () => {
    const tree = renderer
      .create(
        <Button
          type='primary'
          title='you know you wanna...'
          onClick={() => 'clickedy-doo-daa'}
        />,
      )
      .toJSON();

    expect(tree).toMatchSnapshot();
  });
});
