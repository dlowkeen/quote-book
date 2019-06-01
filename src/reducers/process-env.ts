import * as types from '../actions/action-types';

export const INITIAL = {};

// for holding process.env variables (populated in server render)
export default function env(state = INITIAL, action: any) {
  switch (action.type) {
    case types.SET_PROCESS_ENV:
      return { ...action.env };
    default:
      return state;
  }
}
