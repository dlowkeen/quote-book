import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import LoginSignup from '../common/LoginSignup';
import Spacer from '../common/Spacer';
import Navbar from '../Navbar';

const Landing: React.FunctionComponent = () => {
  return (
    <div>
      <Header />
      <Spacer />
      <div />
      <div>
        <p>Keep your quotes stored electronically :) </p>
      </div>
      <div>
        <LoginSignup />
      </div>
      <Spacer />
      <div />
      <Spacer />
      <Spacer />
      <Footer />
    </div>
  );
};

export default Landing;
