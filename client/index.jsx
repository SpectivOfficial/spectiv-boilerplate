import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import Router from './router.jsx';
import createStore from './store/createStore';

import './styles/base.scss';

const store = createStore();

const wrapper = element => (
  <BrowserRouter>
    <Provider store={store}>
      { element }
    </Provider>
  </BrowserRouter>
);

render(wrapper(<Router />), document.getElementById('app'));
