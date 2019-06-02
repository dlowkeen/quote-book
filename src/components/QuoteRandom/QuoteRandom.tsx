import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import Navbar from '../Navbar';

interface IQuoteRandomProps {
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

interface IQuoteRandomState {
  quotes: any;
  author: string;
  error: string;
  showError: boolean;
}
class QuoteRandom extends React.Component<
  IQuoteRandomProps,
  IQuoteRandomState
> {
  componentDidMount() {
    this.props.quoteActions.fetchQuotes(this.props.user.user, 1);
  }
  renderQuotes = () => {
    console.log('this.props', this.props);
    const { quotes } = this.props.quotes;
    if (quotes) {
      console.log('quotes exists', quotes);
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
        <h1>Random Quote From Your Collection</h1>
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
)(QuoteRandom);
