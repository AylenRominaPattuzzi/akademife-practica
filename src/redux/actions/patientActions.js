import axiosInstance from "../../api/axiosInstance";
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,

  FETCH_PATIENT_BY_ID_REQUEST,
  FETCH_PATIENT_BY_ID_SUCCESS,
  FETCH_PATIENT_BY_ID_FAILURE,

  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,

  EDIT_PATIENT_REQUEST,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILURE,

  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,
} from "../types/patientType";

// Obtener todos los pacientes
export const fetchPatients = (page = 1) => async dispatch => {
  dispatch({ type: FETCH_PATIENTS_REQUEST });
  try {
    const res = await axiosInstance.get(`/patients?page=${page}`);
    dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: res.data });
  } catch (error) {
    dispatch({
      type: FETCH_PATIENTS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener pacientes'
    });
  }
};

// Obtener un paciente por ID
export const fetchPatientById = (id) => async dispatch => {
  dispatch({ type: FETCH_PATIENT_BY_ID_REQUEST });
  try {
    const response = await axiosInstance.get(`/patients/${id}`);
    dispatch({ type: FETCH_PATIENT_BY_ID_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: FETCH_PATIENT_BY_ID_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener paciente'
    });
  }
};

// Agregar un paciente
export const addPatient = (formData) => async dispatch => {
  dispatch({ type: ADD_PATIENT_REQUEST });
  try {
    const response = await axiosInstance.post('/patients', formData);
    dispatch({ type: ADD_PATIENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: ADD_PATIENT_FAILURE,
      payload: error.response?.data?.message || 'Error al agregar paciente'
    });
    throw error;
  }
};

// Editar un paciente
export const editPatient = (id, formData) => async dispatch => {
  dispatch({ type: EDIT_PATIENT_REQUEST });
  try {
    const response = await axiosInstance.put(`/patients/${id}`, formData);
    dispatch({ type: EDIT_PATIENT_SUCCESS, payload: response.data });
  } catch (error) {
    dispatch({
      type: EDIT_PATIENT_FAILURE,
      payload: error.response?.data?.message || 'Error al editar paciente'
    });
    throw error;
  }
};

// Eliminar un paciente
export const deletePatient = (id) => async dispatch => {
  dispatch({ type: DELETE_PATIENT_REQUEST });
  try {
    await axiosInstance.delete(`/patients/${id}`);
    dispatch({ type: DELETE_PATIENT_SUCCESS, payload: id });
  } catch (error) {
    dispatch({
      type: DELETE_PATIENT_FAILURE,
      payload: error.response?.data?.message || 'Error al eliminar paciente'
    });
    throw error;
  }
};

