import axios from 'axios';
import { setAlert } from './alertAction';

import {
  GET_FRIEND_REQUEST,
  GET_ALL_FRIEND_REQUESTS,
  CLEAR_FRIEND_REQUEST,
  FRIEND_REQUEST_ERROR,
  UPDATE_FRIEND_REQUEST,
  GET_PROFILE
} from './types';

// Get all friend requests
export const getAllFriendRequests = () => async dispatch => {
  try {
    const res = await axios.get('/api/profile/friend-request');

    dispatch({
      type: GET_ALL_FRIEND_REQUESTS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Get friend request
export const getFriendRequest = () => async dispatch => {
  dispatch({ type: CLEAR_FRIEND_REQUEST });

  try {
    const res = await axios.get('/api/profile/friend-request/me');
    dispatch({
      type: GET_FRIEND_REQUEST,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Send friend request
export const sendFriendRequest = recipientId => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.post(
      '/api/profile/friend-request',
      { recipientId },
      config
    );

    dispatch({
      type: GET_FRIEND_REQUEST,
      payload: res.data
    });

    dispatch(setAlert('Friend request has been sent', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Accept request
export const acceptFriendRequest = recipientId => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.put(
      '/api/profile/friend-request/accept',
      { recipientId },
      config
    );

    dispatch({
      type: UPDATE_FRIEND_REQUEST,
      payload: res.data
    });

    dispatch({
      type: GET_PROFILE
    });

    dispatch(setAlert('Friend request accepted', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};

// Reject friend request
export const rejectFriendRequest = recipientId => async dispatch => {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' }
    };

    const res = await axios.put(
      '/api/profile/friend-request/reject',
      { recipientId },
      config
    );

    dispatch({
      type: UPDATE_FRIEND_REQUEST,
      payload: res.data
    });

    dispatch({
      type: GET_PROFILE
    });

    dispatch(setAlert('Friend request rejected', 'success'));
  } catch (error) {
    const errors = error.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }

    dispatch({
      type: FRIEND_REQUEST_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
