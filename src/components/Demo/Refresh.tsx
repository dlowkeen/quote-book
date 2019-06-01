import React, { MouseEvent } from 'react';

import * as styles from './styles.css';

interface IRefreshProps {
  loading: boolean;
  timesClicked: number;
  handleClick: () => void;
}

class Refresh extends React.Component<IRefreshProps> {
  handleClick = (e: MouseEvent) => {
    e.preventDefault();
    this.props.handleClick();
  };

  render() {
    const { loading, timesClicked } = this.props;

    if (loading) {
      return null;
    }

    return (
      <>
        <button className={styles.refreshButton} onClick={this.handleClick}>
          Fetch Again
        </button>
        {`Clicked ${timesClicked} times`}
      </>
    );
  }
}

export default Refresh;
