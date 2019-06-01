import axios from 'axios';
import React from 'react';

export function validateEmail(email: string) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

class Login extends React.Component {
  state = {
    email: '',
    error: '',
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
    const { email, error, showError } = this.state;
    if (showError) {
      this.setState({ error: 'Please enter valid email' });
    } else {
      console.log('email', email);
      const blah = await axios.get(`/api/email?email=${email}`);
      const healthcheck = await axios.get('/api/healthcheck');
      console.log('healthcheck', healthcheck);
      console.log('blah', blah);
      this.setState({ email: '' });
    }
  };

  render() {
    const { showError, error } = this.state;
    return (
      <div>
        <input
          type='email'
          name='email'
          placeholder=' Email'
          value={this.state.email}
          onChange={this.handleChange}
        />
        <button onClick={this.onClick}>Sign Up</button>
        <div>
          <p>{showError ? error : ''}</p>
        </div>
      </div>
    );
  }
}

export default Login;
