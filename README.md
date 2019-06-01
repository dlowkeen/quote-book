## Built With

- [React](https://reactjs.org/docs/hello-world.html) - Javascript Framework
- [Redux](https://redux.js.org/) - State Mgmt Container
- [Typescript](http://www.typescriptlang.org/) - Type enforcement
- [Webpack](https://webpack.js.org/) - Code Bundler & Task Runner
- [Babel](https://babeljs.io/) - JavaScript compiler
- [PostCSS](https://postcss.org/) - CSS transformation
- [Axios](https://www.npmjs.com/package/axios) - Ajax Requests
- [Font Awesome](https://fontawesome.com/how-to-use/on-the-web/using-with/react) - Easy to use, light-weight icons
- [Prettier](https://prettier.io/) - Code formatting
- [Jest](https://jestjs.io/) Delightful JavaScript Testing
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro) Testing APIs for working with React components

### Typescript config

- interfaces that may be used in multiple places are kept in the `interfaces` directory.
- interfaces used in only one place can be defined where they are used (for example, React component props)
- `tslint.json` specifies linting rules
- `tsconfig.json` provides higher level typescript configuration

### Webpack build

- built resources are output in the `/dist` directory.
- code is split into 2 bundles: `vendor.js` contains dependencies and `main.js` contains source code.
- implements css modules using `postcss-loader`, `typings-for-css-modules-loader`, and `style-loader`.
- .html file (called `generated.html`) is generated from scratch in webpack.config.js using HtmlWebpackPlugin. There is no html template. 3rd party css needed for server rendering in injected into the head of the generated html.
- `babel` is used to compile es6/7 code to es5.
- in dev mode, webpack dev server runs and provides hot module replacement.

### Babel config

- Babel is used in webpack.config.js to compile code as it is being bundled. However, this bundle is only used client side.
- Code that runs server side (including React code rendered on the server and redux code) is also compiled with babel. This code is output into the `/build` directory (not committed).
- Babel configuration for the server build is in `.babelrc.js`. Configuration for CSS modules mirrors that used for the client build in `webpack.config.js`. Additionally, `.babelrc.js` copies all assets from the `/src/public` directory into the `/public` (not committed). The filenames of the assets are hashed to promote proper browser cache invalidation. 

### PostCSS config

- plugin configuration is in `postcss.config.js`
- supports mixins, variables, extend rules & placeholder selectors, custom functions, nested syntax, and more. See config for details.
- global variables for UI settings are defined in `ui-vars.js`
- style linting configuration is in `.stylelintrc.js`

### Code Formatting

- run `npm run format` to format code.
- code formatting is run automatically on `git commit`. Errors must be fixed before the commit can go through.
- prettier settings can be updated in the script in package.json
- linting is managed with a combination of prettier and tslint

### Note on Server Rendering

If you turn off JavaScript in your browser, then start the app in production mode and direct your browser to `localhost:8080`, you'll see that the app renders with all its styles. That's because of the server render functionality. Server rendering can shorten the time to load, and also improve SEO.
If you want to add data fetched from an API to the server render, one way to do that is to dispatch your redux actions in `/srx/renderers/server.tsx` and `await` the result.

# Install

Run: `npm install`

# Test

Run: `npm test`

# Run

We have the option of running in either development mode or production mode.

## Development mode

Run: `npm run dev` (build happens automatically)

- webpack dev server serves the frontend, backend process is kicked off by nodemon.
- Frontend has hot reloading, backend rebuilds and restarts automatically when .ts files are updated.
- Since the html file is served by webpack-dev server, there is no server rendering in dev mode.

## Production mode

To start, run: `npm run start`.
To build and start run: `npm run build:start`

- Webpack build takes place in 'production' mode.
- The html file is served by the express server for all GET requests where the path does not start with `/api`.

# Use

- Development mode: direct your browser to `localhost:3000`
- Production mode: direct your browser to `localhost:8080`

# Deployment with Docker

This service can deployed using docker. A Dockerfile is included which can be used to build it into a production grade docker image.

- Build: from the root directory of this repo, run `docker build -it <registry>/<repo_name>:<tag> .`
- Push to registry: `docker push <registry>/<repo_name>:<tag>`
- Run locally: `docker run -d --rm -p 3000:3000 -e NODE_ENV=staging --name=test <registry>/<repo_name>:<tag>`
