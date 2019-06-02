import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import mongoose from 'mongoose';
import * as config from '../config';

import { IMAGES_DIR, PORT, WEBPACK_OUTPUT_DIR } from '../config';
import middleware from './middleware';

const app = express();

// Set various headers for protection
app.use(helmet());
// Allow cross-domain requests
app.use(cors());

mongoose.connect(
  config.mongo.uri,
  {
    auth: {
      password: config.mongo.password,
      user: config.mongo.user,
    },
    useNewUrlParser: true,
  },
);

middleware(app);

import serverRender from '../renderers/server';
import api from './api';

app.use('/api', api);

// JS bundles & assets are placed in this file by webpack.
// Serve them as static files
// (Note: an appropriate Webpack loader must to be defined for each type of asset)
app.use(express.static(WEBPACK_OUTPUT_DIR));
app.use('/public', express.static(IMAGES_DIR));

app.get('/*', serverRender);

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    console.log('Request reached error handling', err);
    res.sendStatus(err.status || 500);
  },
);

app.listen(PORT, () =>
  console.log(`The server is listening closely on port ${PORT}...`),
);
