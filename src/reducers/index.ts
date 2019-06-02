import { combineReducers } from 'redux';

import demo from './demo';
import processEnv from './process-env';
import quotes from './quotes';
import user from './user';

const rootReducer: any = combineReducers({
  demo,
  processEnv,
  quotes,
  user,
});

export default rootReducer;
