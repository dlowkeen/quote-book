import * as types from '../actions/action-types';

export const initialState: any = {
  errorMsg: '',
  loadingUser: false,
  user: '',
};

export default function user(state = initialState, action: any) {
  const { user, errorMsg } = action;

  switch (action.type) {
    case types.FETCH_USER:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        loadingUser: true,
      };
    case types.FETCH_USER_SUCCESS:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        user,
        loadingUser: initialState.loadingUser,
      };
    case types.FETCH_USER_ERROR:
      return {
        ...state,
        errorMsg,
        loadingUser: initialState.loadingUser,
      };
    default:
      return state;
  }
}
