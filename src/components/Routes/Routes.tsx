import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { DemoContainer } from '../Demo';
import Login from '../Login';
import Quotes from '../Quotes';

const Router: React.FunctionComponent = () => (
  <Switch>
    <Route exact path='/login' component={Login} />
    <Route exact path='/demo/:id' component={DemoContainer} />
    <Route exact path='/login' component={Login} />
    <Route exact path='/quote' component={Quotes} />

    {/* Redirect insures we always have something sensible to render */}
    <Redirect to='/demo/id' />
  </Switch>
);

export default Router;
