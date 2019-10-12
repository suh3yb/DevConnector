import { combineReducers } from 'redux';
import alert from './alertReducer';
import auth from './authReducer';
import profile from './profileReducer';
import post from './postReducer';
import message from './messageReducer';
import update from './updateReducer';

export default combineReducers({
  alert,
  auth,
  profile,
  post,
  message,
  update
});
