import * as types from '../actions/action-types';

export const initialState: any = {
  errorMsg: '',
  loadingQuotes: false,
  user: '',
};

export default function quotes(state = initialState, action: any) {
  const { user, quotes, errorMsg } = action;

  switch (action.type) {
    case types.FETCH_QUOTES:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        loadingQuotes: true,
      };
    case types.FETCH_QUOTES_SUCCESS:
      return {
        ...state,
        errorMsg: initialState.errorMsg,
        quotes,
        loadingQuotes: initialState.loadingQuotes,
      };
    case types.FETCH_QUOTES_ERROR:
      return {
        ...state,
        errorMsg,
        loadingQuotes: initialState.loadingQuotes,
      };
    default:
      return state;
  }
}
