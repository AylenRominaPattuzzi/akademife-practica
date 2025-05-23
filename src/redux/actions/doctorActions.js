import axiosInstance from "../../api/axiosInstance";
import {
  FETCH_DOCTORS_REQUEST,
  FETCH_DOCTORS_SUCCESS,
  FETCH_DOCTORS_FAILURE,
  FETCH_DOCTOR_BY_ID,
  ADD_DOCTOR,
  EDIT_DOCTOR,
  DELETE_DOCTOR
} from "../types/doctorType";

// Obtener todos los doctores
export const fetchDoctors = (page = 1) => async dispatch => {
  dispatch({ type: FETCH_DOCTORS_REQUEST });
  try {
    const res = await axiosInstance.get(`/doctors?page=${page}`);
    const doctors = res.data;
    dispatch({ type: FETCH_DOCTORS_SUCCESS, payload: doctors });
  } catch (error) {
    dispatch({
      type: FETCH_DOCTORS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener doctores'
    });
  }
};

// Obtener un doctor por ID
export const fetchDoctorById = (id) => async dispatch => {
  const response = await axiosInstance.get(`/doctors/${id}`);
  dispatch({ type: FETCH_DOCTOR_BY_ID, payload: response.data });
};

// Agregar un doctor
export const addDoctor = (formData) => async dispatch => {
  const response = await axiosInstance.post('/doctors', formData);
  dispatch({ type: ADD_DOCTOR, payload: response.data });
};

// Editar un doctor
export const editDoctor = (id, formData) => async dispatch => {
  const response = await axiosInstance.put(`/doctors/${id}`, formData);
  dispatch({ type: EDIT_DOCTOR, payload: response.data });
};

// Eliminar un doctor
export const deleteDoctor = (id) => async dispatch => {
  await axiosInstance.delete(`/doctors/${id}`);
  dispatch({ type: DELETE_DOCTOR, payload: id });
};
