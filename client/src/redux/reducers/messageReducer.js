import { GET_MESSAGES, SEND_MESSAGE, MESSAGE_ERROR } from '../actions/types';

const initialState = {
  messages: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: payload,
        loading: false,
      };

    case MESSAGE_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };

    case SEND_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, payload],
        loading: false,
      };

    default:
      return state;
  }
}
