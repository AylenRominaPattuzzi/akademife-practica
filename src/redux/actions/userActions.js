import axiosInstance from "../../api/axiosInstance";
import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from "../types/userTypes";

export const fetchUsers = () => async dispatch => {
  const response = await axiosInstance.get("/users");
  dispatch({ type: FETCH_USERS, payload: response.data });
};

export const fetchUserById = (id) => async dispatch => {
  const response = await axiosInstance.get(`/users/${id}`);
  dispatch({ type: FETCH_USER_BY_ID, payload: response.data });
};

export const addUser = (formData) => async dispatch => {
  const response = await axiosInstance.post("/users", formData);
  dispatch({ type: ADD_USER, payload: response.data });
};

export const editUser = (id, formData) => async dispatch => {
  const response = await axiosInstance.put(`/users/${id}`, formData);
  dispatch({ type: EDIT_USER, payload: response.data });
};

export const deleteUser = (id) => async dispatch => {
  await axiosInstance.delete(`/users/${id}`);
  dispatch({ type: DELETE_USER, payload: id });
};

// Recover password action
export const recoverPassword = (email) => async dispatch => {
  dispatch({ type: RECOVER_PASSWORD_REQUEST });
  try {
    await axiosInstance.post('/user/recover', { email });
    dispatch({ type: RECOVER_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RECOVER_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al enviar email de recuperación'
    });
  }
};

export const resetPassword = (token, password) => async dispatch => {
  dispatch({ type: RESET_PASSWORD_REQUEST });
  try {
    await axiosInstance.post(`/user/reset/${token}`, { password }); 
    dispatch({ type: RESET_PASSWORD_SUCCESS });
  } catch (error) {
    dispatch({
      type: RESET_PASSWORD_FAILURE,
      payload: error.response?.data?.message || 'Error al restablecer contraseña'
    });
  }
};
