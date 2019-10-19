import { combineReducers } from 'redux';
import auth from './authReducer';
import profile from './profileReducer';
import post from './postReducer';

export default combineReducers({
  auth,
  profile,
  post
});
