import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { userActions } from '../../actions';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Spacer from '../common/Spacer';
import * as styles from '../styles.css';

interface IQuoteProps {
  errorMsg: string;
  user: any;
  userActions: any;
  loadingUser: boolean;
  match: {
    params: {
      id: string;
    };
  };
}

interface IQuoteState {
  quote: string;
  author: string;
  error: string;
  showError: boolean;
}
class Quote extends React.Component<IQuoteProps, IQuoteState> {
  state = {
    quote: '',
    author: '',
    error: '',
    showError: true,
  };
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = async () => {
    const { quote, author, error, showError } = this.state;
    const data = {
      author,
      quote,
      user: this.props.user.user,
    };
    const blah = await axios.post(`/api/quote`, data);
    this.setState({ author: '', quote: '' });
  };

  render() {
    const { showError, error } = this.state;
    const { user } = this.props;
    if (this.props && this.props.user && this.props.user.user === '') {
      return <Redirect to='/' />;
    }
    return (
      <div className={styles.center}>
        <Header />
        <div>
          <input
            className={styles.inputfield}
            type='quote'
            name='quote'
            placeholder='Quote'
            value={this.state.quote}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <input
            className={styles.inputfield}
            type='author'
            name='author'
            placeholder='Author'
            value={this.state.author}
            onChange={this.handleChange}
          />
        </div>
        <button className={styles.submitbtn} onClick={this.onClick}>
          Signup
        </button>
        <Spacer />
        <Footer />
      </div>
    );
  }
}

export function mapStateToProps(state: any) {
  return {
    user: state.user,
  };
}

export function mapDispatchToProps(dispatch: redux.Dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Quote);
