import { applyMiddleware, createStore } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import rootReducer from '../reducers';

const middleware: any[] = [thunk];

export default function configureStore(NODE_ENV: string, initialState: any) {
  if (NODE_ENV === 'development') {
    middleware.push(reduxImmutableStateInvariant(), logger);
  }

  // TODO: create interface(s) for initial state once it is known
  return createStore(rootReducer, initialState, applyMiddleware(...middleware));
}
