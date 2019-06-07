import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from '../Landing';
import Profile from '../Profile';
import Quote from '../Quote';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route exact path='/profile' component={Profile} />
    <Route exact path='/quote' component={Quote} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/' />
  </Switch>
);

export default Router;
