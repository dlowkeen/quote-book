import * as actionTypes from './action-types';
import * as actions from './process-env';

describe('process-env actions', () => {
  describe('setEnv', () => {
    it('should set the env object on state', () => {
      const env = { NODE_ENV: 'not telling' };
      const expectedAction = {
        type: actionTypes.SET_PROCESS_ENV,
        env,
      };
      expect(actions.setEnv(env)).toEqual(expectedAction);
    });
  });
});
