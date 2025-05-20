import { loginFailure, loginRequest, loginSuccess } from "../redux/actions/authActions";


export const loginUserThunk = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(loginRequest());
    try {
      const response = await fetch('http://localhost:3000/api/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al iniciar sesión');

      dispatch(loginSuccess(data.token, data.role));
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
};

