import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

export default () => {
  const middleware = [thunk];

  const enhancers = [];

  return createStore(
    rootReducer,
    devTools,
    compose(
      applyMiddleware(...middleware),
      ...enhancers,
    ),
  );
};
