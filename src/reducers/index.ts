import { combineReducers } from 'redux';

import demo from './demo';
import processEnv from './process-env';
import user from './user';

const rootReducer: any = combineReducers({
  demo,
  processEnv,
  user,
});

export default rootReducer;
