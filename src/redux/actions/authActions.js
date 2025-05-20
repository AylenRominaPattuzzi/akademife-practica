import axiosInstance from "../../api/axiosInstance";
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from "../types/authTypes";

// Iniciar sesión
export const loginUser = (credentials) => async (dispatch) => {
  dispatch({ type: LOGIN_REQUEST });

  try {
    const response = await axiosInstance.post('/auth/login', credentials);
    const { token, role } = response.data;

    // Guardar en localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);

    dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });
  } catch (error) {
    dispatch({ type: LOGIN_FAILURE, payload: error.response?.data?.message || "Login failed" });
  }
};

// Cerrar sesión
export const logoutUser = () => async (dispatch) => {
  // Opcional: podés hacer un POST a /auth/logout si tu backend lo requiere
  localStorage.removeItem("token");
  localStorage.removeItem("role");

  dispatch({ type: LOGOUT });
};

// Verificar sesión activa desde localStorage
export const checkAuth = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });
  } else {
    dispatch({ type: LOGOUT });
  }
};

// Thunk para verificar si hay sesión activa
export const checkAuthThunk = () => async (dispatch) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    dispatch({ type: LOGIN_SUCCESS, payload: { token, role } });
  } else {
    dispatch({ type: LOGOUT });
  }
};
