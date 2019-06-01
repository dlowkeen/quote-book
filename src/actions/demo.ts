import axios from 'axios';
import redux from 'redux';

import { IDemoData } from '../interfaces';
import * as types from './action-types';

export function beginfetchDemoData() {
  return {
    type: types.FETCH_DEMO_DATA,
  };
}

export function fetchDemoDataSuccess(demoData: IDemoData) {
  return {
    demoData,
    type: types.FETCH_DEMO_DATA_SUCCESS,
  };
}

export function fetchDemoDataError(errorMsg: string | null, id: string) {
  return {
    errorMsg: errorMsg || `Error fetching demo data for ID: ${id}`,
    type: types.FETCH_DEMO_DATA_ERROR,
  };
}

export const fetchDemoData: any = (id: string) => {
  return async (dispatch: redux.Dispatch) => {
    dispatch(beginfetchDemoData());

    try {
      const { data } = await axios.get(`/api/demo-data?id=${id}`);
      dispatch(fetchDemoDataSuccess(data));
    } catch (err) {
      dispatch(fetchDemoDataError(err.response.data, id));
    }
  };
};
