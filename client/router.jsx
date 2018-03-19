import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Test from './components/Test.jsx';

const Router = () => (
  <Switch>
    <Route exact path="/" component={Test} />
  </Switch>
);

export default Router;
