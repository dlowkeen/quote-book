import axios from 'axios';
import redux from 'redux';

import * as types from './action-types';

export function beginfetchQuotes() {
  return {
    type: types.FETCH_QUOTES,
  };
}

export function fetchQuotesSuccess(quotes: string) {
  return {
    quotes,
    type: types.FETCH_QUOTES_SUCCESS,
  };
}

export function fetchQuotesError(errorMsg: string | null, user: string) {
  return {
    errorMsg: errorMsg || `Error fetching quotes for user: ${user}`,
    type: types.FETCH_QUOTES_ERROR,
  };
}

export const fetchQuotes: any = (email: string, qty: string) => {
  return async (dispatch: redux.Dispatch) => {
    dispatch(beginfetchQuotes());

    try {
      console.log('email', email, qty);
      const { data } = await axios.get(`/api/quote?user=${email}&qty=${qty}`);
      console.log('data', data);
      dispatch(fetchQuotesSuccess(data.quotes));
    } catch (err) {
      console.log('err', err);
      dispatch(fetchQuotesError(err.response.data, email));
    }
  };
};
