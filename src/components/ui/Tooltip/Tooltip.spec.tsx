import React from 'react';
import { fireEvent, render, waitForElement } from 'react-testing-library';

import Tooltip from './Tooltip';

describe('The Tooltip component', () => {
  it('is hidden by default', () => {
    const { queryByText } = render(
      <Tooltip>
        <div>Tooltip all day</div>
      </Tooltip>,
    );

    expect(queryByText('Tooltip all day')).toBeFalsy();
  });

  it('shows on mouseover', async () => {
    const { getByTestId, getByText } = render(
      <Tooltip>
        <div>Tooltip all day</div>
      </Tooltip>,
    );

    fireEvent.mouseOver(getByTestId('root'));

    await waitForElement(() => getByText('Tooltip all day'));

    getByText('Tooltip all day');
  });

  it('disappears again on button click', async () => {
    const { container, getByTestId, getByText, queryByText } = render(
      <Tooltip>
        <div>Tooltip all day</div>
      </Tooltip>,
    );

    fireEvent.mouseOver(getByTestId('root'));

    await waitForElement(() => getByText('Tooltip all day'));

    const button = container.querySelector('button');
    if (button) {
      button.click();
    }

    expect(queryByText('Tooltip all day')).toBeFalsy();
  });
});
