import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LoginSignup from '../common/LoginSignup';
import Spacer from '../common/Spacer';
import * as styles from '../styles.css';

const Landing: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <ScrollAnimation
        animateIn='fadeIn'
        animateOut=''
        duration={2}
        animateOnce={true}
        offset={100}
      >
        <div className={styles.center}>
          <h3>An online tool for storing quotes.</h3>
          <br />
        </div>
        <div>
          <LoginSignup />
        </div>
      </ScrollAnimation>
      <Spacer />
      <Spacer />
      <Spacer />
      <br />
      <Footer />
    </div>
  );
};

export default Landing;
