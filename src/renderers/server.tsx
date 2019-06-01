import express from 'express';
import fs from 'fs';
import { join } from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom';
import { promisify } from 'util';

import { processEnvActions } from '../actions';
import { WEBPACK_OUTPUT_DIR } from '../config';
import createProcessEnv from '../config/process';

import App from '../components/App';
import configureStore from '../store';

const readFileAsync = promisify(fs.readFile);

const environment = createProcessEnv(process.env);
const store = configureStore(environment.NODE_ENV, {});

const serverRender = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction,
) => {
  try {
    // Don't serve in dev mode, since index.html will be served by webpack-dev-server
    // using process.env directly here rather than config object,
    // since config.NODE_ENV defaults to 'delevlopment' to enable the frontend dev tools like redux-logger
    if (process.env.NODE_ENV === 'development') return next();

    // Build preloaded state to send to client, so it already has necessary data on load
    let preloadedState: any = {};
    try {
      // attach process env variables to state so client can get them
      store.dispatch<any>(processEnvActions.setEnv(environment));
      preloadedState = store.getState();
    } catch (err) {
      console.log('Failed to generate preladed state in server render:', err);
    }

    // This context object is used by the BrowserRouter and StaticRouter
    // to pass information to each other
    const context: any = {};
    // Markup to send preloaded to client
    const renderedReact = renderToString(
      <Provider store={store}>
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      </Provider>,
    );

    // Webpack generates 'generated.html' using WebpackHtmlPlugin
    // We intentionally do not call it 'index.html' so it is ignored by express.static
    const template = await readFileAsync(
      join(WEBPACK_OUTPUT_DIR, 'generated.html'),
      'utf8',
    );

    // This shouldn't happen given the Redirect component in the App component,
    // But including to be explicit just in case.
    if (context.status === 404) {
      res.status(404);
    }

    // Context.url is defined if a Redirect component was tripped in a routing Switch case
    // Handle the redirect explicitly on the server in this case.
    if (context.url) {
      return res.redirect(301, context.url);
    }

    // The pre-rendered markup is injected into index.html and sent to the client.
    // This means that while the client is fetching the JS bundles in the script tags in index.html,
    // the user is already able to interact with the markup.
    res.send(renderFullPage(template, renderedReact, preloadedState));
  } catch (err) {
    console.log('Server render error:', err);
    res.status(500).send(`Server render error: ${err}`);
  }
};

function renderFullPage(
  template: string,
  renderedReact: string,
  preloadedState: any,
) {
  return template.replace(
    /id="root">.*<\/div>/,
    `id="root">${renderedReact}</div><script>
			window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
        /</g,
        '\\u003c',
      )}
		</script>`,
  );
}

export default serverRender;
