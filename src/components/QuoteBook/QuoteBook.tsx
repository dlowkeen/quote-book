import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { quoteActions } from '../../actions';
import AddQuote from '../AddQuote';
import Pagination from '../common/Pagination';
import Quote from '../common/Quote';
import * as styles from '../styles.css';
import { Modal } from '../ui/Modal';

interface IQuoteBookProps {
  errorMsg: string;
  user: any;
  quotes: any;
  quoteActions: any;
  loadingUser: boolean;
}

interface IQuoteBookState {
  add: boolean;
  edit: boolean;
  quotes: any;
  error: string;
  showError: boolean;
  showAll: boolean;
  targetId: string;
  targetAuthor: string;
  targetQuote: string;
  open: boolean;
  quotesPerPage: number;
  currentQuotes: any;
  currentPage: number;
}
class QuoteBook extends React.Component<IQuoteBookProps, IQuoteBookState> {
  state = {
    add: false,
    edit: false,
    quotes: [],
    error: '',
    showError: false,
    showAll: true,
    targetId: '',
    targetAuthor: '',
    targetQuote: '',
    open: false,
    quotesPerPage: 10,
    currentQuotes: [],
    currentPage: 1,
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
  onPageForward = () => {
    if (
      this.state.currentPage <
      this.props.quotes.quotes.length / this.state.quotesPerPage
    ) {
      this.setState({ currentPage: this.state.currentPage + 1 });
    }
  };
  onPageBack = () => {
    if (this.state.currentPage > 1) {
      this.setState({ currentPage: this.state.currentPage - 1 });
    }
  };
  selectPage = (ev: any) => {
    this.setState({ currentPage: parseInt(ev.target.value, 0) });
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
  handleEditClick = (ev: any) => {
    this.setState({
      open: true,
      edit: true,
      targetId: ev.currentTarget.dataset.id,
      targetAuthor: ev.currentTarget.dataset.author,
      targetQuote: ev.currentTarget.dataset.quote,
    });
  };
  handleCancel = () => {
    this.setState({
      open: false,
      edit: false,
      add: false,
      targetAuthor: '',
      targetQuote: '',
    });
  };
  handleAddClick = (ev: any) => {
    this.setState({
      open: true,
      add: true,
    });
  };
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };
  onClick = async () => {
    const { add, edit, targetAuthor, targetId, targetQuote } = this.state;
    const data = {
      targetAuthor,
      targetId,
      targetQuote,
      user: this.props.user.user,
    };
    if (add) {
      await axios.post(`/api/quote`, data);
    } else if (edit) {
      await axios.put(`/api/quote/edit`, data);
    }
    this.setState({
      targetAuthor: '',
      targetId: '',
      targetQuote: '',
      add: false,
      edit: false,
      open: false,
    });
    this.props.quoteActions.fetchQuotes(this.props.user.user, 'all');
  };
  renderQuotes = () => {
    const { currentPage, quotesPerPage } = this.state;
    const { quotes } = this.props.quotes;
    if (quotes && quotes.length > 0) {
      const displayed: any = quotes.map((x: any) => {
        if (x.status === 'active') {
          return (
            <Quote
              key={x.id}
              id={x.id}
              author={x.author}
              quote={x.quote}
              handleDeleteClick={this.handleDeleteClick}
              handleEditClick={this.handleEditClick}
            />
          );
        }
      });
      return displayed.slice(
        (currentPage - 1) * quotesPerPage,
        currentPage * quotesPerPage,
      );
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
    const { user, quotes } = this.props;
    if (user && user.user === '') {
      return <Redirect to='/' />;
    }
    return (
      <div className={styles.container}>
        <h1 className={styles.center}>Quotes</h1>
        <button onClick={this.handleAddClick}>Add Quote</button>
        <span onClick={this.renderSwitch}>
          {this.state.showAll ? (
            <button>View Random Quote</button>
          ) : (
            <button>View All Quotes</button>
          )}
        </span>
        <br />
        <Modal
          open={this.state.open}
          children={
            this.state.add || this.state.edit ? (
              <div>
                <AddQuote
                  targetAuthor={this.state.targetAuthor}
                  targetQuote={this.state.targetQuote}
                  handleChange={this.handleChange}
                  onClick={this.onClick}
                  onCancel={this.handleCancel}
                />
              </div>
            ) : (
              <div>
                Are you sure you want to delete this quote?
                <span>
                  <button
                    className={styles.submitbtn}
                    onClick={this.confirmDelete}
                  >
                    Yes
                  </button>
                  <button
                    className={styles.cancelbtn}
                    onClick={this.handleCancel}
                  >
                    No
                  </button>
                </span>
              </div>
            )
          }
        />
        {this.renderQuotes()}
        <Pagination
          currentPage={this.state.currentPage}
          totalPages={
            this.props.quotes && this.props.quotes.quotes
              ? this.props.quotes.quotes.length / this.state.quotesPerPage
              : 0
          }
          selectPage={this.selectPage}
          onPageBack={this.onPageBack}
          onPageForward={this.onPageForward}
        />
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
