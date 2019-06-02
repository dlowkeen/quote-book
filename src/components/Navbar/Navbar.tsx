import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { userActions } from '../../actions';

interface INavbarProps {
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

interface INavbarState {
  error: string;
  showError: boolean;
}
class Navbar extends React.Component<INavbarProps, INavbarState> {
  renderLinks = () => {
    return (
      <div>
        <Link to='/quote'>Add Quote</Link>
        <Link to='/quote/all'>View All Quotes</Link>
        <Link to='/quote/random'>Randomize Quote</Link>
      </div>
    );
  };
  render() {
    return (
      <div>
        {this.props.user && this.props.user.user ? (
          this.renderLinks()
        ) : (
          <div>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Signup</Link>
          </div>
        )}
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
)(Navbar);
