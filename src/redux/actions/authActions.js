import { LOGIN_FAILURE, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT } from "../types/authTypes";


export const loginRequest = () => ({ type: LOGIN_REQUEST });

export const loginSuccess = (token, role) => ({
  type: LOGIN_SUCCESS,
  payload: { token, role },
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});


export const checkAuth = (token, role) => ({
  type: LOGIN_SUCCESS,
  payload: { token, role },
});

// Thunk para verificar si hay sesión activa
export const checkAuthThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    dispatch(checkAuth(token, role));
  } else {
    dispatch(logout());
  }
};
