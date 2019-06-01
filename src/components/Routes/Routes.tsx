import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DemoContainer } from '../Demo';
import Login from '../Login';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/demo/:id' component={DemoContainer} />
    <Route exact path='/login' component={Login} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/demo/id' />
  </Switch>
);

export default Router;
