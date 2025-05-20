import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS } from "../types/authTypes";


export const loginRequest = () => ({ type: LOGIN_REQUEST });
export const loginSuccess = (token, role) => ({
  type: LOGIN_SUCCESS,
  payload: { token, role },
});
export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});


