import { combineReducers } from 'redux';

import demo from './demo';
import processEnv from './process-env';

const rootReducer = combineReducers({
  demo,
  processEnv,
});

export default rootReducer;
