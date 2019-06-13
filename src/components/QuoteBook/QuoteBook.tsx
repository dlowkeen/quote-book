import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import Quote from '../Quote';
import * as styles from '../styles.css';
import { Modal } from '../ui/Modal';

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
  add: boolean;
  quotes: any;
  error: string;
  showError: boolean;
  showAll: boolean;
  targetAuthor: string;
  targetQuote: string;
  open: boolean;
}
class QuoteBook extends React.Component<IQuoteBookProps, IQuoteBookState> {
  state = {
    add: false,
    quotes: [],
    error: '',
    showError: false,
    showAll: true,
    targetAuthor: '',
    targetQuote: '',
    open: false,
  };
  componentDidMount() {
    const { showAll } = this.state;
    const qty = showAll ? 'all' : '1';
    this.props.quoteActions.fetchQuotes(this.props.user.user, qty);
  }
  handleDeleteClick = (ev: any) => {
    this.setState({
      open: true,
      targetAuthor: ev.currentTarget.dataset.author,
      targetQuote: ev.currentTarget.dataset.quote,
    });
  };
  confirmDelete = () => {
    const payload = {
      author: this.state.targetAuthor,
      quote: this.state.targetQuote,
      user: this.props.user.user,
    };
    this.props.quoteActions.deleteQuote(payload);
    this.setState({ open: false });
    this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
  };
  handleCancel = () => {
    this.setState({ open: false });
  };
  handleAddClick = (ev: any) => {
    this.setState({
      open: true,
      add: true,
    });
  };
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    console.log('this.state', this.state);
  };
  onClick = async () => {
    const { targetQuote, targetAuthor } = this.state;
    const data = {
      targetAuthor,
      targetQuote,
      user: this.props.user.user,
    };
    const blah = await axios.post(`/api/quote`, data);
    console.log('blah', blah);
    this.setState({
      targetAuthor: '',
      targetQuote: '',
      add: false,
      open: false,
    });
    this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
  };
  renderQuotes = () => {
    const { quotes } = this.props.quotes;
    if (quotes && quotes.length > 0) {
      const displayed = quotes.map((x: any) => {
        if (x.status === 'active') {
          return (
            <div key={x.quote}>
              <div className={styles.card}>
                <div className={styles.above}>
                  <button
                    data-author={x.author}
                    data-quote={x.quote}
                    onClick={this.handleDeleteClick}
                  >
                    Delete
                  </button>
                  {/* <p>Edit</p> */}
                </div>
                <div>
                  <h3>"{x.quote}"</h3>
                  <p>
                    Author: {x.author || x.author === '' ? x.author : 'unknown'}
                  </p>
                </div>
              </div>
              <br />
            </div>
          );
        }
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
    if (this.props && this.props.user && this.props.user.user === '') {
      return <Redirect to='/' />;
    }
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>Quotes</h1>
        <button onClick={this.handleAddClick}>Add Quote</button>
        <span onClick={this.renderSwitch}>
          {this.state.showAll ? 'View Random Quote' : 'View All Quotes'}
        </span>
        <br />
        <Modal
          open={this.state.open}
          children={
            this.state.add ? (
              <div>
                <Quote
                  targetAuthor={this.state.targetAuthor}
                  targetQuote={this.state.targetQuote}
                  handleChange={this.handleChange}
                  onClick={this.onClick}
                />
              </div>
            ) : (
              <div>
                Are you sure you want to delete this quote?
                <span>
                  <button onClick={this.confirmDelete}>Yes</button>{' '}
                  <button onClick={this.handleCancel}>No</button>
                </span>
              </div>
            )
          }
        />
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
