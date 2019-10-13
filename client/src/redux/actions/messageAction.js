import axios from 'axios';
import { setAlert } from './alertAction';
import { SEND_MESSAGE, GET_MESSAGES, MESSAGE_ERROR } from './types';

//Get messages
const getMessages = (sender_id, receiver_id) => async dispatch => {
  try {
    const res = await axios.get(`/api/message/${sender_id}/${receiver_id}`);
    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};
export default getMessages;

export const sendMessage = (sender_id, receiver_id, text) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = { text, sender_id, receiver_id };

  try {
    const res = await axios.post('/api/message', body, config);

    dispatch({
      type: SEND_MESSAGE,
      payload: res.data,
    });

    dispatch(setAlert('Message Sended', 'success'));
  } catch (error) {
    dispatch({
      type: MESSAGE_ERROR,
      payload: { msg: error.response.statusText, status: error.response.status },
    });
  }
};
