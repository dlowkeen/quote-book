import React from 'react';

import * as styles from '../inputs.css';

interface IDollarProps {
  max: string;
  label: string;
  value: string;
  onChange: (e: any) => void;
}

const Dollar: React.FunctionComponent<IDollarProps> = ({
  label,
  value,
  onChange,
  max,
}) => (
  <div className={`${styles.formElement} ${styles.formElementText}`}>
    <label>{label}</label>
    <div className={styles.formElementSymbol}>$</div>
    <input type='tel' value={value} onChange={onChange} max={max} min='0' />
  </div>
);

export default Dollar;
