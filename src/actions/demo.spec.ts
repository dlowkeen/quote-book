import axios from 'axios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import { initialState } from '../reducers/demo';
import * as actionTypes from './action-types';
import * as actions from './demo';

const mockAxios: any = axios; // gets rid of ts errors

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Demo actions', () => {
  // Constants
  const id = 'whatever';
  const testData = [
    {
      categories: [],
      createdDate: 'createdDate',
      filename: 'filename',
      id: 'id',
    },
  ];
  const errorMsg = 'errorMsg';
  const error = {
    response: {
      data: errorMsg,
    },
  };

  // Tests
  describe('fetchDemoDataSuccess', () => {
    it('should create an action to set demoData', () => {
      const expectedAction = {
        type: actionTypes.FETCH_DEMO_DATA_SUCCESS,
        demoData: testData,
      };
      expect(actions.fetchDemoDataSuccess(testData)).toEqual(expectedAction);
    });
  });

  describe('fetchDemoDataError', () => {
    it('should create an action to set error', () => {
      const expectedAction = {
        type: actionTypes.FETCH_DEMO_DATA_ERROR,
        errorMsg,
      };
      expect(actions.fetchDemoDataError(errorMsg, id)).toEqual(expectedAction);
    });

    it('creates default error message if none provided', () => {
      const expectedAction = {
        type: actionTypes.FETCH_DEMO_DATA_ERROR,
        errorMsg: `Error fetching demo data for ID: ${id}`,
      };
      expect(actions.fetchDemoDataError(null, id)).toEqual(expectedAction);
    });
  });

  describe('fetchDemoData', () => {
    describe('success case', () => {
      it('fetches data then dispatches SUCCESS action', async () => {
        const store = mockStore(initialState);

        mockAxios.get.mockImplementationOnce(() =>
          Promise.resolve({
            data: testData,
          }),
        );

        await store.dispatch(actions.fetchDemoData(id));
        const resultingActions: any = store.getActions();

        expect(mockAxios.get).toBeCalledTimes(1);
        expect(mockAxios.get.mock.calls[0]).toEqual([
          `/api/demo-data?id=${id}`,
        ]);

        expect(resultingActions).toHaveLength(2);
        expect(resultingActions[0]).toEqual(actions.beginfetchDemoData());
        expect(resultingActions[1]).toEqual(
          actions.fetchDemoDataSuccess(testData),
        );
      });
    });

    describe('error case', () => {
      it('dispatches ERROR action if request fails', async () => {
        const store = mockStore(initialState);

        mockAxios.get.mockImplementationOnce(() => Promise.reject(error));

        await store.dispatch(actions.fetchDemoData(id));
        const resultingActions: any = store.getActions();

        expect(resultingActions).toHaveLength(2);
        expect(resultingActions[0]).toEqual(actions.beginfetchDemoData());
        expect(resultingActions[1]).toEqual(
          actions.fetchDemoDataError(errorMsg, id),
        );
      });
    });
  });
});
