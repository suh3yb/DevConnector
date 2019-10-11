import axios from 'axios';
import { setAlert } from './alertAction';
import { SEND_MESSAGE, GET_MESSAGES, MESSAGE_ERROR } from './types';
//Get posts
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
    console.log('beforePost');
    const res = await axios.post('/api/message', body, config);
    console.log('afterPost');

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
// Add COMMENT

// export const addComment = (postId, formData) => async dispatch => {
//   const config = {
//     headers: { 'Content-Type': 'application/json' },
//   };
//   try {
//     const res = await axios.post(`/api/posts/comment/${postId}`, formData, config);
//     dispatch({
//       type: ADD_COMMENT,
//       payload: res.data,
//     });
//     dispatch(setAlert('Comment Added', 'success'));
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status },
//     });
//   }
// };
