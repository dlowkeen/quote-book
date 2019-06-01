import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-testing-library';
import { createStore } from 'redux';

import rootReducer from '../reducers';
import configureStore from '../store';

// Here's how we mock the redux setup for tests.
// We can provide initialState or the entire store that the ui is rendered with
// NOTE: If the component you're testing doesn't need a store instance, you don't need this;
// you can use just the 'render' method from react-testing-library in your test file directly
export const renderWithRedux = (ui: any, config: any = {}) => {
  const initialState = config.initialState || {};

  if (!config.store) {
    // Hooking in the actual reducer
    config.store = createStore(rootReducer, initialState);
  }

  return {
    ...render(<Provider store={config.store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store: config.store,
  };
};

// This method is useful for integration tests.
// allows you to pass in any initialState, but uses actual thunks and action dispatchers
// will likely be necessary to side effects such what is returned by axios mock
export const renderWithActualAppStore = (ui: any, initialState: any = {}) => {
  const store = configureStore(
    'not-"development"-so-no-redux-logger',
    initialState,
  );

  return {
    ...render(<Provider store={store}>{ui}</Provider>),
  };
};
