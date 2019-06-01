import React from 'react';

import * as styles from './styles.css';

interface IButtonClassByType {
  primary: string;
  secondary: string;
  [key: string]: string;
}

interface IButtonProps {
  onClick: (e: any) => void;
  type: string;
  title: string;
}

const buttonClassByType: IButtonClassByType = {
  primary: styles.btnPrimary,
  secondary: styles.btnSecondary,
};

const Button: React.FunctionComponent<IButtonProps> = ({
  type,
  onClick,
  title,
}) => (
  <button
    className={`${styles.btn} ${buttonClassByType[type]}`}
    onClick={onClick}
  >
    {title}
  </button>
);

export default Button;
