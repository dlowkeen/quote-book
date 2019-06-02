import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar: React.FunctionComponent = () => {
  return (
    <div>
      <Link to='/quote'>Add Quote</Link>
      <h1>Hello World</h1>
    </div>
  );
};
