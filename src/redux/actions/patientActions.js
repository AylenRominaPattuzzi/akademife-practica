import axiosInstance from "../../api/axiosInstance";
import { 
    ADD_PATIENT, 
    DELETE_PATIENT, 
    EDIT_PATIENT, 
    FETCH_PATIENTS, 
    FETCH_PATIENT_BY_ID 
} from "../types/patientType";

// Obtener todos los pacientes
export const fetchPatients = () => async dispatch => {
    const response = await axiosInstance.get('/patients');
    dispatch({ type: FETCH_PATIENTS, payload: response.data });
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
