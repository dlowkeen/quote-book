import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DemoContainer } from '../Demo';
import Login from '../Login';
import Quote from '../Quote';
import Signup from '../Signup';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route exact path='/quote' component={Quote} />
    <Route exact path='/signup' component={Signup} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/demo/id' />
  </Switch>
);

export default Router;
