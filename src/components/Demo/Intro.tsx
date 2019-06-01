import React from 'react';

import { ICON_TYPES } from '../../interfaces';
import { Icon } from '../ui';

import * as styles from './styles.css';

interface IIntroProps {
  id: string;
}

const Intro: React.FunctionComponent<IIntroProps> = ({ id }) => (
  <div className={styles.ok}>
    <Icon type={ICON_TYPES.thumbsup} />
    <p>Welcome to the demo page.</p>
    <p>The purpose of this page is simply to demonstrate how:</p>
    <p>1) React is hooked up (via Redux) to the backend of the application</p>
    <p>2) How state is managed with Redux and React-Redux</p>
    <p>
      Kindly pretend for a moment that you are requesting data from the API on
      uploaded documents for demo ID: {` ${id}`}.
    </p>
    <p>
      There is a 50% chance your request will succeed. The UI will reflect the
      result.
    </p>
    <hr />
  </div>
);

export default Intro;
