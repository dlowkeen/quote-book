import axios from 'axios';
import React from 'react';
import { fireEvent, waitForElement } from 'react-testing-library';

const mockAxios: any = axios; // avoid ts-lint errors

import {
  renderWithActualAppStore,
  renderWithRedux,
} from '../../utils/test-utils';
import ConnectedDemoContainer, {
  DemoContainer,
  mapDispatchToProps,
  mapStateToProps,
} from './DemoContainer';

const errorMsg = 'this is the error datas';
const testData = [
  {
    categories: [],
    createdDate: 'createdDate',
    filename: 'filename',
    id: 'id',
  },
];
const testAppState = {
  demo: {
    demoData: testData,
    loadingDemoData: false,
    errorMsg: '',
  },
};
const demoProps = {
  errorMsg: '',
  demoData: testData,
  loadingDemoData: false,
  demoDataActions: {
    fetchDemoData: jest.fn(),
  },
  match: {
    params: {
      id: 'id',
    },
  },
};

describe('Demo', () => {
  describe('mapStateToProps', () => {
    it('should map state to props correctly', () => {
      const componentState = mapStateToProps(testAppState);

      expect(componentState).toEqual({
        demoData: testAppState.demo.demoData,
        loadingDemoData: testAppState.demo.loadingDemoData,
        errorMsg: testAppState.demo.errorMsg,
      });
    });
  });

  describe('mapDispatchToProps', () => {
    it('maps demoDataActions to props', () => {
      const dispatch = jest.fn();
      const mappedActions = mapDispatchToProps(dispatch);

      expect(Object.keys(mappedActions)).toHaveLength(1);
      expect(mappedActions).toHaveProperty('demoDataActions');
    });
  });

  describe('DemoContainer component', () => {
    describe('data already loaded', () => {
      it('renders expected success content', () => {
        const { getByText, queryByText } = renderWithRedux(
          <DemoContainer {...demoProps} />,
        );

        // renders welcome message
        getByText(/Welcome to the demo page/);

        // renders sucess message
        getByText(/Your request has succeeded/);

        // renders refresh button
        getByText(/Fetch Again/);
        // not yet clicked
        getByText(/Clicked 0 times/);

        // does not render Loading component
        expect(queryByText(/Error Message:/)).toBeFalsy();
        // does not render loading message
        expect(queryByText(/Loading.../)).toBeFalsy();
      });

      it('does not fire action to fetch data', () => {
        renderWithRedux(<DemoContainer {...demoProps} />);

        expect(demoProps.demoDataActions.fetchDemoData).toHaveBeenCalledTimes(
          0,
        );
      });
    });

    describe('error already on state loaded', () => {
      it('renders expected error content', () => {
        const { getByText, queryByText } = renderWithRedux(
          <DemoContainer
            {...{
              ...demoProps,
              demoData: [],
              errorMsg,
            }}
          />,
        );

        // renders welcome message
        getByText(/Welcome to the demo page/);

        // does not render sucess message
        expect(queryByText(/Your request has succeeded/)).toBeFalsy();
        // does not render loading message
        expect(queryByText(/Loading.../)).toBeFalsy();

        // renders refresh button
        getByText(/Fetch Again/);
        // not yet clicked
        getByText(/Clicked 0 times/);

        // renders error message
        getByText(/Error Message:/);
      });

      it('fires action to fetch data', () => {
        renderWithRedux(
          <DemoContainer
            {...{
              ...demoProps,
              demoData: [],
              errorMsg,
            }}
          />,
        );

        expect(demoProps.demoDataActions.fetchDemoData).toHaveBeenCalledTimes(
          1,
        );
      });
    });

    describe('while loading', () => {
      it('renders expected loading placeholder', () => {
        const { getByText, queryByText } = renderWithRedux(
          <DemoContainer
            {...{
              ...demoProps,
              demoData: [],
              loadingDemoData: true,
            }}
          />,
        );

        // renders welcome message
        getByText(/Welcome to the demo page/);

        // doesnt render success, error, or refetch button
        expect(queryByText(/Your request has succeeded/)).toBeFalsy();
        expect(queryByText(/Error Message:/)).toBeFalsy();
        expect(queryByText(/Fetch Again/)).toBeFalsy();
        expect(queryByText(/Clicked/)).toBeFalsy();

        // not yet clicked
        getByText(/Loading.../);
      });

      it('fires action to fetch data', () => {
        renderWithRedux(
          <DemoContainer
            {...{
              ...demoProps,
              demoData: [],
              loadingDemoData: true,
            }}
          />,
        );

        expect(demoProps.demoDataActions.fetchDemoData).toHaveBeenCalledTimes(
          1,
        );
      });
    });

    describe('Refreshing data', () => {
      it('refreshes on click', async () => {
        const { getByText } = renderWithRedux(<DemoContainer {...demoProps} />);

        // simulate click
        const fetchAgainBtn = getByText('Fetch Again');
        fireEvent.click(fetchAgainBtn);

        // fake thunk fired
        expect(demoProps.demoDataActions.fetchDemoData).toHaveBeenCalledTimes(
          1,
        );
      });

      it('button text shows number of clicks', async () => {
        const { getByText } = renderWithRedux(<DemoContainer {...demoProps} />);

        // 0 clicks ocurred
        getByText(/Clicked 0 times/);

        // simulate click
        const fetchAgainBtn = getByText('Fetch Again');
        fireEvent.click(fetchAgainBtn);

        // 1 click ocurred (async so omponent state has a chance to change)
        await waitForElement(async () => await getByText(/Clicked 1 times/));

        // and again...
        fireEvent.click(fetchAgainBtn);
        await waitForElement(async () => await getByText(/Clicked 2 times/));
      });

      // This is more of an integration test:
      // we're using the connected component, with the actual thunk,
      // but mocking axios to control what comes back from the 'api'
      // this tests across the entire front-end react/redux stack
      it('works end-to-end', async () => {
        mockAxios.set('get', testData);

        const { getByText, queryByText } = renderWithActualAppStore(
          <ConnectedDemoContainer match={{ params: { id: testData[0].id } }} />,
          testAppState,
        );

        // not currently loading
        expect(queryByText(/Loading.../)).toBeFalsy();

        // simulate click
        const fetchAgainBtn = getByText('Fetch Again');
        fireEvent.click(fetchAgainBtn);

        // Then is loading
        getByText(/Loading.../);
        // axios GET request fired
        expect(mockAxios.get).toHaveBeenCalledTimes(1);

        // Wait for ajax request to be done, then should see 'sucess' message
        await waitForElement(() => getByText(/Your request has succeeded/));

        // text next to the button shows how many clicks have ocurred
        getByText(/Clicked 1 times/);
      });
    });
  });
});
