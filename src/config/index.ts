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
