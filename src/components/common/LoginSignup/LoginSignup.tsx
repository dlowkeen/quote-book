import React from 'react';
import * as styles from '../../styles.css';
import Login from './Login';
import Signup from './Signup';

class LoginSignup extends React.Component {
  state = {
    login: true,
  };

  toggle = () => {
    if (this.state.login) {
      this.setState({ login: false });
    } else {
      this.setState({ login: true });
    }
  };

  render() {
    return (
      <div className={styles.center}>
        {this.state.login ? <Login /> : <Signup />}
        <span onClick={this.toggle}>
          {this.state.login ? 'Signup for an account' : 'Login to your account'}
        </span>
      </div>
    );
  }
}

export default LoginSignup;
