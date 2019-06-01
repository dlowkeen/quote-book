import bodyParser from 'body-parser';
import express from 'express';

export default (app: express.Router) => {
  app.use(bodyParser.json({ strict: false }));
  app.use(bodyParser.urlencoded({ extended: true }));
};
