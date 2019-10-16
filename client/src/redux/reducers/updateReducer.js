import { GET_UPDATE } from '../actions/types';
import { RESET_UPDATE } from '../actions/types';
const initialState = { length: 0 };
export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case GET_UPDATE:
      return { ...state, length: ++state.length };
    case RESET_UPDATE:
      return { ...state, length: 0 };
    default:
      return state;
  }
}
