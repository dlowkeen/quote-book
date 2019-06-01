import React from 'react';

import * as styles from '../inputs.css';

interface ISelectProps {
  options: string[];
  label: string;
  onChange: (e: any) => void;
  value: string;
}

const Select: React.FunctionComponent<ISelectProps> = ({
  options,
  label,
  onChange,
  value,
}) => {
  const optionSource = options || [];

  const mappedOptions = optionSource.map((o: any, i: number) => {
    const option = {
      label: '',
      value: '',
    };

    if (typeof o === 'string') {
      option.label = o;
      option.value = o;
    } else {
      option.label = o.label;
      option.value = o.value;
    }

    return (
      <option key={i} value={option.value}>
        {' '}
        {option.label}{' '}
      </option>
    );
  });

  return (
    <div className={`${styles.formElement} ${styles.formElementSelect}`}>
      <label>{label}</label>
      <select value={value} onChange={onChange}>
        {mappedOptions}
      </select>
    </div>
  );
};

export default Select;
