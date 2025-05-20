import axios from '../api/axiosInstance';
import { loginRequest, loginSuccess, loginFailure } from '../redux/actions/authActions';

export const loginUser = ({ email, password }) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post('/user/login', { email, password });
    dispatch(loginSuccess(data.token, data.role));
  } catch (error) {
    dispatch(loginFailure(error.response?.data?.message || error.message));
  }
};
