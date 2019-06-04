import axios from 'axios';
import React from 'react';
import { connect } from 'react-redux';
import redux, { bindActionCreators } from 'redux';
import { userActions } from '../../actions';

export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

interface ILoginProps {
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

interface ILoginState {
  email: string;
  error: string;
  password: string;
  showError: boolean;
}
class Login extends React.Component<ILoginProps, ILoginState> {
  state = {
    email: '',
    error: '',
    password: '',
    showError: true,
  };
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
    if (validateEmail(this.state.email)) {
      this.setState({ error: '', showError: false });
    } else {
      this.setState({ showError: true });
    }
  };

  onClick = async () => {
    console.log('this.state', this.state);
    const { email, error, password, showError } = this.state;
    if (this.state.password === '') {
      this.setState({ showError: true, error: 'Password cannot be blank' });
      return;
    }
    if (showError) {
      this.setState({ error: 'Please enter valid email' });
    } else {
      this.props.userActions.fetchUser(email, 'login', password);
    }
  };

  render() {
    const { showError, error } = this.state;
    const { user } = this.props;
    return (
      <div>
        <input
          type='email'
          name='email'
          placeholder=' Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <input
          type='password'
          name='password'
          placeholder=' Password'
          value={this.state.password}
          onChange={this.handleChange}
        />
        <button onClick={this.onClick}>Login</button>
        <div>
          <p>{showError ? error : ''}</p>
          <p>
            {user.errorMsg && user.errorMsg.message
              ? user.errorMsg.message
              : ''}
          </p>
        </div>
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
)(Login);
