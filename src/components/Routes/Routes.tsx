import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DemoContainer } from '../Demo';
import Landing from '../Landing';
import Login from '../Login';
import Quote from '../Quote';
import QuoteBook from '../QuoteBook';
import QuoteRandom from '../QuoteRandom';
import Signup from '../Signup';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/signup' component={Signup} />
    <Route exact path='/quote' component={Quote} />
    <Route exact path='/quote/all' component={QuoteBook} />
    <Route exact path='/quote/random' component={QuoteRandom} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/' />
  </Switch>
);

export default Router;
