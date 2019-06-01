import React from 'react';
import reactDOM from 'react-dom';

import * as styles from './styles.css';

interface IModalProps {
  children: any;
  open: boolean;
}

const Modal: React.FunctionComponent<IModalProps> = ({ children, open }) =>
  open
    ? reactDOM.createPortal(
        <aside className={styles.cModalCover}>
          <div className={styles.cModal}>{children}</div>
        </aside>,
        document.body,
      )
    : null;

export default Modal;
