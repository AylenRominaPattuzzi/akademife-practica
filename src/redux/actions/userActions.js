import axiosInstance from "../../api/axiosInstance";
import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER_BY_ID,
} from "../types/userTypes";

// Obtener todos los usuarios
export const fetchUsers = () => async dispatch => {
  const response = await axiosInstance.get("/users");
  dispatch({ type: FETCH_USERS, payload: response.data });
};

// Obtener un usuario por ID
export const fetchUserById = (id) => async dispatch => {
  const response = await axiosInstance.get(`/users/${id}`);
  dispatch({ type: FETCH_USER_BY_ID, payload: response.data });
};

// Agregar un nuevo usuario
export const addUser = (formData) => async dispatch => {
  const response = await axiosInstance.post("/users", formData);
  dispatch({ type: ADD_USER, payload: response.data });
};

// Editar un usuario existente
export const editUser = (id, formData) => async dispatch => {
  const response = await axiosInstance.put(`/users/${id}`, formData);
  dispatch({ type: EDIT_USER, payload: response.data });
};

// Eliminar un usuario
export const deleteUser = (id) => async dispatch => {
  await axiosInstance.delete(`/users/${id}`);
  dispatch({ type: DELETE_USER, payload: id });
};
