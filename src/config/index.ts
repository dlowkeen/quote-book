import { resolve } from 'path';
import * as devKeys from './devKeys';

export const WEBPACK_OUTPUT_DIR = resolve(__dirname, '../../dist');
export const IMAGES_DIR = resolve(__dirname, '../../public');

// Since process.env exists only on the server,
// the constants listed below are only intended for server-side use
// Constants that must be made avaliable client side are
// attached to the redux state using the function in './process.ts'
export const PORT = process.env.PORT || 8080;

export const mailJet = {
  apiKeyPrivate:
    process.env.NODE_ENV === 'production'
      ? process.env.MJ_APIKEY_PRIVATE
      : devKeys && devKeys.mailJet
      ? devKeys.mailJet.apiKeyPrivate
      : 'NA',
  apiKeyPublic:
    process.env.NODE_ENV === 'production'
      ? process.env.MJ_APIKEY_PUBLIC
      : devKeys && devKeys.mailJet
      ? devKeys.mailJet.apiKeyPublic
      : 'NA',
};

export const mongo = {
  uri: 'mongodb://ds231307.mlab.com:31307/quote-book', // TO-DO: store in env variables
  password: 'Quotebook1!', // TO-DO: store in env variables
  user: 'admin', // TO-DO: store in env variables
};
