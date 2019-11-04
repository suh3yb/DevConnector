import { GET_UPDATE, RESET_UPDATE } from './types';
import { setAlert } from './alertAction';
//Get Update
export const getUpdate = () => async dispatch => {
  try {
    dispatch({
      type: GET_UPDATE,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};

//reset update
export const resetUpdate = () => async dispatch => {
  try {
    dispatch({
      type: RESET_UPDATE,
    });
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
  }
};
