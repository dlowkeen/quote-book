import React from 'react';

import * as styles from '../inputs.css';

interface INumberProps {
  max: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const Number: React.FunctionComponent<INumberProps> = ({
  label,
  value,
  onChange,
  max,
}) => (
  <div className={`${styles.formElement} ${styles.formElementText}`}>
    <label>{label}</label>
    <input type='number' value={value} onChange={onChange} max={max} min='0' />
  </div>
);

export default Number;
