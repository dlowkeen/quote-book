import React from 'react';

import * as styles from '../inputs.css';

interface ITextProps {
  label: string;
}

const Text: React.FunctionComponent<ITextProps> = ({ label }) => (
  <div className={`${styles.formElement} ${styles.formElementText}`}>
    <label>{label}</label>
    <input type='text' />
  </div>
);

export default Text;
