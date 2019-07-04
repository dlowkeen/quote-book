import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import * as styles from '../../styles.css';

interface IQuoteProps {
  id: string;
  author: string;
  quote: string;
  handleDeleteClick: any;
  handleEditClick: any;
}

export const Quote: React.FunctionComponent<IQuoteProps> = props => {
  return (
    <ScrollAnimation
      animateIn='fadeIn'
      animateOut=''
      animateOnce={true}
      offset={100}
    >
      <div>
        <div className={styles.card}>
          <div className={styles.above}>
            <button
              data-author={props.author}
              data-quote={props.quote}
              onClick={props.handleDeleteClick}
            >
              Delete
            </button>
            <button
              data-author={props.author}
              data-id={props.id}
              data-quote={props.quote}
              onClick={props.handleEditClick}
            >
              Edit
            </button>
          </div>
          <div>
            <h3 className={styles.quote}>"{props.quote}"</h3>
            <p className={styles.author}>
              ~ {props.author || props.author === '' ? props.author : 'unknown'}
            </p>
          </div>
        </div>
        <br />
      </div>
    </ScrollAnimation>
  );
};
