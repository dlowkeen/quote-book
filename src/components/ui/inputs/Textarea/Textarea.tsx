import React from 'react';

import * as styles from '../inputs.css';

interface ITextAreaProps {
  label: string;
  name: string;
  handleChange: (e: any) => void;
}

const Textarea: React.FunctionComponent<ITextAreaProps> = ({
  label,
  name,
  handleChange,
}) => (
  <div className={`${styles.formElement} ${styles.formElementText}`}>
    <label>{label}</label>
    <textarea name={name} onChange={handleChange} />
  </div>
);

export default Textarea;
