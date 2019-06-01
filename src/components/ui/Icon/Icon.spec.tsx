import React from 'react';
import renderer from 'react-test-renderer';

import Icon from './Icon';

describe('The Icon component', () => {
  it('renders as expected', () => {
    const tree = renderer.create(<Icon type='iconType' />).toJSON();

    expect(tree).toMatchSnapshot();
  });
});
