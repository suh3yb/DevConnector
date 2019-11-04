import {
  GET_FRIEND_REQUEST,
  GET_ALL_FRIEND_REQUESTS,
  CLEAR_FRIEND_REQUEST,
  FRIEND_REQUEST_ERROR,
  UPDATE_FRIEND_REQUEST
} from '../actions/types';

const initialState = {
  friendRequests: [],
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_FRIEND_REQUEST:
    case UPDATE_FRIEND_REQUEST:
      return {
        ...state,
        friendRequests: [...state.friendRequests, ...payload],
        loading: false
      };
    case GET_ALL_FRIEND_REQUESTS:
      return {
        ...state,
        friendRequests: payload,
        loading: false
      };
    case FRIEND_REQUEST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case CLEAR_FRIEND_REQUEST:
      return {
        ...state,
        friendRequest: null,
        loading: false
      };
    default:
      return state;
  }
}
