import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import redux, { bindActionCreators } from 'redux';
import { userActions } from '../../../actions';

import * as styles from './style.css';

interface IHeaderProps {
  user: any;
}

class Header extends React.Component<IHeaderProps> {
  render() {
    const { user } = this.props;
    console.log('user', user);
    return (
      <div>
        <div className={styles.above}>
          {user && user.user ? (
            <div>
              <Link to='/quote'>Add</Link> | <Link to='/profile'>Profile</Link>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={styles.siteHeader}>
          <div className={styles.container}>
            <div className={styles.siteHeaderInner}>
              <div className='brand header-brand'>
                <h3 className='m-0'>
                  <a href='/'>
                    <svg
                      width={32}
                      height={32}
                      viewBox='0 0 32 32'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <title>SimpleQuoteBook</title>
                      <defs>
                        <linearGradient
                          x1='100%'
                          y1='0%'
                          x2='0%'
                          y2='100%'
                          id='logo-gradient-b'
                        >
                          <stop stopColor='#39D8C8' offset='0%' />
                          <stop stopColor='#BCE4F4' offset='47.211%' />
                          <stop stopColor='#838DEA' offset='100%' />
                        </linearGradient>
                        <path
                          d='M32 1636v16H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h28a2 2 0 0 1 2 2v14z'
                          id='logo-gradient-a'
                        />
                        <linearGradient
                          x1='23.065%'
                          y1='25.446%'
                          y2='100%'
                          id='logo-gradient-c'
                        >
                          <stop
                            stopColor='#1274ED'
                            stopOpacity={0}
                            offset='0%'
                          />
                          <stop stopColor='#1274ED' offset='100%' />
                        </linearGradient>
                      </defs>
                      <g fill='none' fillRule='evenodd'>
                        <mask id='logo-gradient-d' fill='#fff'>
                          <use xlinkHref='#logo-gradient-a' />
                        </mask>
                        <use
                          fill='url(#logo-gradient-b)'
                          xlinkHref='#logo-gradient-a'
                        />
                        <path
                          fill='url(#logo-gradient-c)'
                          mask='url(#logo-gradient-d)'
                          d='M-16-16h32v32h-32z'
                        />
                      </g>
                    </svg>
                  </a>
                  SimpleQuoteBook
                </h3>
              </div>
            </div>
          </div>
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
)(Header);
