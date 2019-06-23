import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Landing from '../Landing';
import Profile from '../Profile';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/' component={Landing} />
    <Route exact path='/profile' component={Profile} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/' />
  </Switch>
);

export default Router;
