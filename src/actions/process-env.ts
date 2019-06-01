import * as actionTypes from './action-types';

export function setEnv(env: any) {
  return {
    env,
    type: actionTypes.SET_PROCESS_ENV,
  };
}
