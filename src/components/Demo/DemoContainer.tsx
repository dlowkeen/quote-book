import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';

import { demoDataActions } from '../../actions';
import { IDemoData, IStoreState } from '../../interfaces';
import Intro from './Intro';
import Refresh from './Refresh';
import Result from './Result';

interface IDemoContainerProps {
  errorMsg: string;
  demoData: IDemoData;
  demoDataActions: any;
  loadingDemoData: boolean;
  match: {
    params: {
      id: string;
    };
  };
}

interface IDemoContainerState {
  timesClicked: number;
}

// if there is no props or state, just use `{}` rather than a named interface
export class DemoContainer extends React.Component<
  IDemoContainerProps,
  IDemoContainerState
> {
  state = {
    timesClicked: 0,
  };

  componentDidMount() {
    // If there is no file data in the store, go get it!
    if (!this.props.demoData.length) {
      this.refreshDemoData();
    }
  }

  componentDidUpdate(prevProps: IDemoContainerProps) {
    // If id param in the route has changed, get data for the new Id
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.refreshDemoData();
    }
  }

  refreshDemoData = () => {
    const { demoDataActions, match } = this.props;
    demoDataActions.fetchDemoData(match.params.id);
  };

  handleRefreshClick = () => {
    this.refreshDemoData();
    this.setState({
      timesClicked: this.state.timesClicked + 1,
    });
  };

  render() {
    const {
      errorMsg,
      loadingDemoData,
      demoData,
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <>
        <Intro id={id} />
        <Refresh
          loading={loadingDemoData}
          timesClicked={this.state.timesClicked}
          handleClick={this.handleRefreshClick}
        />
        <Result data={demoData} errorMsg={errorMsg} loading={loadingDemoData} />
      </>
    );
  }
}

export function mapStateToProps(state: IStoreState) {
  return {
    demoData: state.demo.demoData,
    errorMsg: state.demo.errorMsg,
    loadingDemoData: state.demo.loadingDemoData,
  };
}

export function mapDispatchToProps(dispatch: redux.Dispatch) {
  return {
    demoDataActions: bindActionCreators(demoDataActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DemoContainer);
