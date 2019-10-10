import { POST_ERROR, GET_UPDATE, RESET_UPDATE } from './types';
//Get Update
export const getUpdate = () => async dispatch => {
  try {
    console.log('i am get update');
    dispatch({
      type: GET_UPDATE,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
//reset update
export const resetUpdate = () => async dispatch => {
  try {
    dispatch({
      type: RESET_UPDATE,
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
