import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import * as styles from '../styles.css';

interface IQuoteBookProps {
  errorMsg: string;
  user: any;
  quotes: any;
  quoteActions: any;
  loadingUser: boolean;
  match: {
    params: {
      id: string;
    };
  };
}

interface IQuoteBookState {
  quotes: any;
  error: string;
  showError: boolean;
  showAll: boolean;
}
class QuoteBook extends React.Component<IQuoteBookProps, IQuoteBookState> {
  state = {
    quotes: [],
    error: '',
    showError: false,
    showAll: true,
  };
  componentDidMount() {
    const { showAll } = this.state;
    const qty = showAll ? 'all' : '1';
    this.props.quoteActions.fetchQuotes(this.props.user.user, qty);
  }
  renderQuotes = () => {
    const { quotes } = this.props.quotes;
    if (quotes && quotes.length > 0) {
      const displayed = quotes.map((x: any) => {
        return (
          <div key={x.quote}>
            <div className={styles.card}>
              <h3>"{x.quote}"</h3>
              <p>
                Author: {x.author || x.author === '' ? x.author : 'unknown'}
              </p>
            </div>
            <br />
          </div>
        );
      });
      return displayed;
    } else {
      return <h2>You need to add some quotes first!</h2>;
    }
  };

  renderSwitch = () => {
    const { showAll } = this.state;
    if (showAll) {
      this.props.quoteActions.fetchQuotes(this.props.user.user, 1);
      this.setState({ showAll: false });
    } else {
      this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
      this.setState({ showAll: true });
    }
  };
  render() {
    const { user } = this.props;
    if (this.props && this.props.user && this.props.user.user === '') {
      return <Redirect to='/' />;
    }
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>Quotes</h1>
        <span onClick={this.renderSwitch}>
          {this.state.showAll ? 'View Random Quote' : 'View All Quotes'}
        </span>
        <br />
        {this.renderQuotes()}
      </div>
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    user: state.user,
    quotes: state.quotes,
  };
}

export function mapDispatchToProps(dispatch: redux.Dispatch) {
  return {
    quoteActions: bindActionCreators(quoteActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuoteBook);
