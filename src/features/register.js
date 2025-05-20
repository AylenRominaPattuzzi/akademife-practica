import {
  registerRequest,
  registerSuccess,
  registerFailure,
  addUser,
  editUser,
  deleteUser,
} from '../redux/actions/authActions';
import axios from '../api/axiosInstance';

export const registerUser = (userData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post('/user/register', userData);
    dispatch(registerSuccess(null, null, data));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

export const fetchUserById = (userId) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.get(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(addUser(data));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

export const editUser = (userId, updatedData) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const token = localStorage.getItem('token');
    const { data } = await axios.put(`/user/${userId}`, updatedData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(editUser(data));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

export const deleteUser = (userId) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`/user/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch(deleteUser(userId));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

export const recoverPassword = (email) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post('/user/recover', { email });
    dispatch(registerSuccess(null, null, data.message));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};

export const resetPassword = (token, newPassword) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const { data } = await axios.post(`/user/reset/${token}`, { password: newPassword });
    dispatch(registerSuccess(data.token, data.role, null));
  } catch (error) {
    dispatch(registerFailure(error.response?.data?.message || error.message));
  }
};