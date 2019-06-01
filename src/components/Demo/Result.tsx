import React from 'react';

import { IDemoData } from '../../interfaces';
import * as styles from './styles.css';

interface IResultProps {
  data: IDemoData;
  errorMsg: string;
  loading: boolean;
}

const Result: React.FunctionComponent<IResultProps> = ({
  data,
  errorMsg,
  loading,
}) => {
  if (loading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (errorMsg) {
    return (
      <p>
        Error Message: <span className={styles.dang}>{errorMsg}</span>
      </p>
    );
  }

  return (
    <>
      <p className={styles.ok}>
        Your request has succeeded. Your data is below.
      </p>
      <p className={styles.ok}>
        What you would do now is build a nice component tree for it.
      </p>
      <p>{JSON.stringify(data)}</p>
    </>
  );
};

export default Result;
