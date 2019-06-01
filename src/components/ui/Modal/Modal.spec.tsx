import React from 'react';
import { render } from 'react-testing-library';

import Modal from './Modal';

describe('The Modal component', () => {
  it('renders as expected when props.open is truthy', () => {
    const { getByText } = render(
      <Modal open>
        <div>Modal all day</div>
      </Modal>,
    );

    getByText('Modal all day');
  });

  it('does not render when props.open is falsey', () => {
    const { queryByText } = render(
      <Modal open={false}>
        <div>Modal all day</div>
      </Modal>,
    );

    expect(queryByText('Modal all day')).toBeFalsy();
  });
});
