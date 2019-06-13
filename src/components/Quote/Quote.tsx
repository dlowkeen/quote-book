import React from 'react';
import * as styles from '../styles.css';

interface IQuoteProps {
  handleChange: any;
  targetAuthor: string;
  targetQuote: string;
  onClick: any;
}

const Quote: React.FunctionComponent<IQuoteProps> = props => {
  return (
    <div className={styles.center}>
      <div>
        <textarea
          className={`${styles.inputfield} ${styles.inputfieldtextarea}`}
          name='targetQuote'
          placeholder='Add Quote Here'
          value={props.targetQuote}
          onChange={props.handleChange}
        />
      </div>
      <div>
        <input
          className={styles.inputfield}
          type='text'
          name='targetAuthor'
          placeholder='Author'
          value={props.targetAuthor}
          onChange={props.handleChange}
        />
      </div>
      <button className={styles.submitbtn} onClick={props.onClick}>
        Add Quote
      </button>
    </div>
  );
};

export default Quote;
