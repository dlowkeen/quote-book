import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import Navbar from '../Navbar';

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
    console.log('hi');
    console.log('this.props', this.props);
    this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
  }
  renderQuotes = () => {
    const { quotes } = this.props.quotes;
    if (quotes) {
      const displayed = quotes.map((x: any) => {
        return (
          <div key={x.quote}>
            <h3>{x.quote}</h3>
            <p>Author: {x.author || x.author === '' ? x.author : 'unknown'}</p>
          </div>
        );
      });
      return displayed;
    }
  };
  render() {
    return (
      <div>
        <Navbar />
        <h1>Quote Book</h1>
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
