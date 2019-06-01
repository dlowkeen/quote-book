import * as types from '../actions/action-types';

import { IDemoStoreState } from '../interfaces';

export const initialState: IDemoStoreState = {
  errorMsg: '',
  demoData: [],
  loadingDemoData: false,
};

export default function demo(state = initialState, action: any) {
  const { demoData, errorMsg } = action;

  switch (action.type) {
    case types.FETCH_DEMO_DATA:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        loadingDemoData: true,
      };
    case types.FETCH_DEMO_DATA_SUCCESS:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        demoData,
        loadingDemoData: initialState.loadingDemoData,
      };
    case types.FETCH_DEMO_DATA_ERROR:
      return {
        ...state,
        errorMsg,
        demoData: initialState.demoData,
        loadingDemoData: initialState.loadingDemoData,
      };
    default:
      return state;
  }
}
