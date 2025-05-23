import { combineReducers } from 'redux';
import authReducer from './authReducer';
import userReducer from './userReducer';
import patientReducer from './patientReducer';


const rootReducer = combineReducers({
  auth: authReducer,
  register: userReducer,
  patient: patientReducer
});

export default rootReducer;
