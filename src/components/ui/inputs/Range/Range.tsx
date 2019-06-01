import React from 'react';

import * as styles from '../inputs.css';

interface IRangeProps {
  label: string;
  value: string;
  onChange: (e: any) => void;
  max: string;
}

const Range: React.FunctionComponent<IRangeProps> = ({
  label,
  value,
  onChange,
  max,
}) => (
  <div className={`${styles.formElement} ${styles.formElementRange}`}>
    <label>{label}</label>
    <input
      type='range'
      value={value}
      onChange={onChange}
      max={max}
      min='0'
      step='1'
    />
  </div>
);

export default Range;
