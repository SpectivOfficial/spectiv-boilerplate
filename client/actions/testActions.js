import { TEST_ACTION } from './../constants/actionTypes';

export const testAction = () => dispatch => dispatch({
  type: TEST_ACTION,
});
