import React from 'react';
import ReactDOM from 'react-dom';

import { Icon } from '../';

import * as styles from './styles.css';

interface ITooltipProps {
  children: any;
}

class Tooltip extends React.Component<ITooltipProps> {
  targetNode: any;
  state = {
    showTooltip: false,
  };

  // lifecycle
  componentDidMount() {
    // TODO -- this is a bit questionable - render() below will fire before the component is mounted so we won't have a DOM node to target for Portalizing. This won't be a problem in practice unless we need a tooltip that defaults to open.
    this.targetNode = ReactDOM.findDOMNode(this);
  }

  // renders tooltip via React Portal
  renderTooltip = (children: any, target: any) =>
    ReactDOM.createPortal(
      <div className={styles.tooltip}>
        <div className={styles.tooltipContent}>{children}</div>
        <button
          className={styles.tooltipClose}
          onClick={this.handleHideTooltip}
        >
          X
        </button>
      </div>,
      target,
    );

  // helpers for opening / closing the modal (this could be simplified if we're ok with only having the tooltip open on hover, and not keeping it open / requiring the user to close it manually)
  handleShowTooltip = () => {
    this.setState({
      showTooltip: true,
    });
  };
  handleHideTooltip = () => {
    this.setState({
      showTooltip: false,
    });
  };

  render() {
    return (
      <div
        className={styles.tooltipWrap}
        onMouseOver={this.handleShowTooltip}
        data-testid='root'
      >
        <span className={styles.tooltipIcon}>
          <Icon type='info' />
        </span>
        {this.state.showTooltip && this.targetNode
          ? this.renderTooltip(this.props.children, this.targetNode)
          : null}
      </div>
    );
  }
}

export default Tooltip;
