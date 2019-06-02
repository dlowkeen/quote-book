import { resolve } from 'path';

export const WEBPACK_OUTPUT_DIR = resolve(__dirname, '../../dist');
export const IMAGES_DIR = resolve(__dirname, '../../public');

// Since process.env exists only on the server,
// the constants listed below are only intended for server-side use
// Constants that must be made avaliable client side are
// attached to the redux state using the function in './process.ts'
export const PORT = process.env.PORT || 8080;
export const API = {
  uri:
    process.env.API_URL ||
    'https://currencysimpleapi-integration.azurewebsites.net/',
};

export const mailJet = {
  apiKeyPrivate: '67859e5295026552d70f866e16d5db36', // process.env.MJ_APIKEY_PRIVATE || "NA",
  apiKeyPublic: 'e4d5e9c0574389cbebedcd53e7171def', //  process.env.MJ_APIKEY_PUBLIC || "NA"
};

export const mongo = {
  uri: 'mongodb://ds231307.mlab.com:31307/quote-book', // TO-DO: store in env variables
  password: 'Quotebook1!', // TO-DO: store in env variables
  user: 'admin', // TO-DO: store in env variables
};
