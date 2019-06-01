import axios from 'axios';
import React from 'react';

class Quotes extends React.Component {
  state = {
    quote: '',
    author: '',
    error: '',
    showError: true,
  };
  handleChange = (event: any) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  onClick = async () => {
    console.log('this.state', this.state);
    const { quote, author, error, showError } = this.state;
    const data = {
      author,
      quote,
    };
    const blah = await axios.post(`/api/quote`, data);
    this.setState({ author: '', quote: '' });
  };

  render() {
    const { showError, error } = this.state;
    return (
      <div>
        <input
          type='quote'
          name='quote'
          placeholder='Quote'
          value={this.state.quote}
          onChange={this.handleChange}
        />
        <input
          type='author'
          name='author'
          placeholder='Author'
          value={this.state.author}
          onChange={this.handleChange}
        />
        <button onClick={this.onClick}>Submit</button>
        {/* <div>
          <p>{showError ? error : ""}</p>
        </div> */}
      </div>
    );
  }
}

export default Quotes;
