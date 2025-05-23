import axiosInstance from "../../api/axiosInstance";
import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  FETCH_PATIENT_BY_ID,
  ADD_PATIENT,
  EDIT_PATIENT,
  DELETE_PATIENT
} from "../types/patientType";

// Obtener todos los pacientes
export const fetchPatients = (page=1) => async dispatch => {
  dispatch({ type: FETCH_PATIENTS_REQUEST });
  try {
    const res = await axiosInstance.get(`/patients?page=${page}`);
    const patients = res.data;
    
    dispatch({ type: FETCH_PATIENTS_SUCCESS, payload: patients });
  } catch (error) {
    dispatch({
      type: FETCH_PATIENTS_FAILURE,
      payload: error.response?.data?.message || 'Error al obtener pacientes'
    });
  }
};


// Obtener un paciente por ID
export const fetchPatientById = (id) => async dispatch => {
  const response = await axiosInstance.get(`/patients/${id}`);
  dispatch({ type: FETCH_PATIENT_BY_ID, payload: response.data });
};

// Agregar un paciente
export const addPatient = (formData) => async dispatch => {
  const response = await axiosInstance.post('/patients', formData);
  dispatch({ type: ADD_PATIENT, payload: response.data });
};

// Editar un paciente
export const editPatient = (id, formData) => async dispatch => {
  const response = await axiosInstance.put(`/patients/${id}`, formData);
  dispatch({ type: EDIT_PATIENT, payload: response.data });
};

// Eliminar un paciente
export const deletePatient = (id) => async dispatch => {
  await axiosInstance.delete(`/patients/${id}`);
  dispatch({ type: DELETE_PATIENT, payload: id });
};
