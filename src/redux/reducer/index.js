import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  register: userReducer,
});

export default rootReducer;
