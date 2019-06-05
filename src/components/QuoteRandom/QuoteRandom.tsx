import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Spacer from '../common/Spacer';

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
    if (this.props.quotes && this.props.quotes.quotes) {
      const displayed = this.props.quotes.quotes.map((x: any) => {
        return (
          <div key={x.quote}>
            <h3>{x.quote}</h3>
            <p>Author: {x.author || x.author === '' ? x.author : 'unknown'}</p>
          </div>
        );
      });
      return displayed;
    } else {
      return <h2>You need to add some quotes first!</h2>;
    }
  };
  render() {
    return (
      <div>
        <Header />
        <h1>Random Quote From Your Collection</h1>
        {this.renderQuotes()}
        <Spacer />
        <Footer />
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
