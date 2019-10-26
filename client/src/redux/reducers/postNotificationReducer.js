import { GET_UPDATE } from '../actions/types';
import { RESET_UPDATE, POST_ERROR } from '../actions/types';
const initialState = { length: 0, error: {} };
export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_UPDATE:
      return { ...state, length: ++state.length };
    case RESET_UPDATE:
      return { ...state, length: 0 };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
      };
    default:
      return state;
  }
}
