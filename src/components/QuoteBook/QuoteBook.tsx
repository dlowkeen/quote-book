import React from 'react';
import Navbar from '../Navbar';

class QuoteBook extends React.Component {
  componentDidMount() {
    console.log('hi');
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Quote Book</h1>
      </div>
    );
  }
}

export default QuoteBook;
