import * as types from '../actions/action-types';
import demo, { initialState } from './demo';

describe('The demo reducer', () => {
  // Constants
  const demoData = [
    {
      categories: [],
      createdDate: 'createdDate',
      filename: 'filename',
      id: 'id',
    },
  ];

  // Tests
  describe('unrecognized action', () => {
    it('should not modify state', () => {
      const newState = demo(undefined, { type: 'UNRECOGNIZED_ACTION' });
      expect(newState).toEqual(initialState);
      expect(newState).toBe(initialState);
    });
  });

  describe(types.FETCH_DEMO_DATA, () => {
    it('sets "loadingDemoData" to true', () => {
      const newState = demo(initialState, { type: types.FETCH_DEMO_DATA });
      expect(newState).toEqual({
        ...initialState,
        loadingDemoData: true,
      });
    });
  });

  describe(types.FETCH_DEMO_DATA_SUCCESS, () => {
    it(`action ${types.FETCH_DEMO_DATA_SUCCESS}`, () => {
      const state = { ...initialState, errorMsg: 'Error' };
      const action = {
        type: types.FETCH_DEMO_DATA_SUCCESS,
        demoData,
      };
      const newState = demo(state, action);

      expect(newState).toEqual({
        ...state,
        demoData,
        errorMsg: initialState.errorMsg,
        loadingDemoData: initialState.loadingDemoData,
      });
    });
  });

  describe(types.FETCH_DEMO_DATA_ERROR, () => {
    it(`action ${types.FETCH_DEMO_DATA_ERROR}`, () => {
      const state = { ...initialState, demoData };
      const action = {
        type: types.FETCH_DEMO_DATA_ERROR,
        errorMsg: 'Error',
      };
      const newState = demo(state, action);

      expect(newState).toEqual({
        ...state,
        loadingDemoData: initialState.loadingDemoData,
        demoData: initialState.demoData,
        errorMsg: action.errorMsg,
      });
    });
  });
});
