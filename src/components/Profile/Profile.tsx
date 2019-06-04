import React from 'react';
import Footer from '../common/Footer';
import Header from '../common/Header';
import Spacer from '../common/Spacer';
import QuoteBook from '../QuoteBook';

class Profile extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <QuoteBook />
        <Spacer />
        <Footer />
      </div>
    );
  }
}

export default Profile;
