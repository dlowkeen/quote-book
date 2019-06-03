import axios from 'axios';
import redux from 'redux';

import * as types from './action-types';

export function beginfetchUser() {
  return {
    type: types.FETCH_USER,
  };
}

export function fetchUserSuccess(user: string) {
  return {
    user,
    type: types.FETCH_USER_SUCCESS,
  };
}

export function fetchUserError(errorMsg: string | null, user: string) {
  return {
    errorMsg: errorMsg || `Error fetching user: ${user}`,
    type: types.FETCH_USER_ERROR,
  };
}

export const fetchUser: any = (
  email: string,
  action: string,
  password: string,
) => {
  return async (dispatch: redux.Dispatch) => {
    dispatch(beginfetchUser());

    try {
      console.log('email', email, action);
      const payload = {
        action,
        email,
        password,
      };
      const { data } = await axios.post('/api/email', payload);
      console.log('data', data);
      dispatch(fetchUserSuccess(data.email));
    } catch (err) {
      console.log('err', err);
      dispatch(fetchUserError(err.response.data, email));
    }
  };
};
