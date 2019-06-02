import axios from 'axios';
import redux from 'redux';

import * as types from './action-types';

export function beginfetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function fetchUserSuccess(User: string) {
  return {
    User,
    type: types.FETCH_USER_SUCCESS,
  };
}

export function fetchUserError(errorMsg: string | null, user: string) {
  return {
    errorMsg: errorMsg || `Error fetching user: ${user}`,
    type: types.FETCH_USER_ERROR,
  };
}

export const fetchUser: any = (email: string) => {
  return async (dispatch: redux.Dispatch) => {
    console.log('hiiiiii');
    dispatch(beginfetchUser());

    try {
      console.log('were here now!');
      const { data } = await axios.get(`/api/email?email=${email}`);
      console.log('data', data);
      dispatch(fetchUserSuccess(data));
    } catch (err) {
      dispatch(fetchUserError(err.response.data, email));
    }
  };
};
