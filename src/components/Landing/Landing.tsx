import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LoginSignup from '../common/LoginSignup';
import Spacer from '../common/Spacer';
import * as styles from '../styles.css';

const Landing: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <div className={styles.center}>
        <h3>An online tool for storing quotes.</h3>
        <br />
      </div>
      <div>
        <LoginSignup />
      </div>
      <Spacer />
      <Spacer />
      <Spacer />
      <br />
      <Footer />
    </div>
  );
};

export default Landing;
