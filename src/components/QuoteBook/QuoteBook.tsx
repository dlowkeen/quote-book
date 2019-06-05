import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import * as styles from './styles.css';

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
  author: string;
  error: string;
  showError: boolean;
}
class QuoteBook extends React.Component<IQuoteBookProps, IQuoteBookState> {
  componentDidMount() {
    this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
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
  render() {
    const { user } = this.props;
    if (this.props && this.props.user && this.props.user.user === '') {
      return <Redirect to='/' />;
    }
    return (
      <div>
        <h1>Quotes</h1>
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
