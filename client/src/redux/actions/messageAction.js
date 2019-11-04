import axios from 'axios';
import { setAlert } from './alertAction';
import { loadUser } from './authAction';
import {
  SEND_MESSAGE,
  GET_MESSAGES,
  MESSAGE_ERROR,
  CLEAR_MESSAGES
} from './types';

const getMessages = (sender_id, receiver_id) => async dispatch => {
  try {
    const res = await axios.get(`/api/message/${sender_id}/${receiver_id}`);
    dispatch({
      type: GET_MESSAGES,
      payload: res.data
    });
    dispatch({
      type: CLEAR_MESSAGES
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
export default getMessages;

export const sendMessage = (sender_id, receiver_id, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };
  const body = { text, sender_id, receiver_id };

  try {
    const res = await axios.post('/api/message', body, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data
    });
    dispatch(loadUser());
    dispatch(setAlert('Message Sent', 'success'));
  } catch (error) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status }
    });
  }
};
