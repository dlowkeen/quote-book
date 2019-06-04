import React from 'react';
import Login from '../../Login';
import Signup from '../../Signup';

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
      <div>
        {this.state.login ? <Login /> : <Signup />}
        <button onClick={this.toggle}>
          {this.state.login ? 'Signup' : 'Login'}
        </button>
      </div>
    );
  }
}

export default LoginSignup;
