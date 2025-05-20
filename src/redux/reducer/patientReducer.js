import { ADD_PATIENT, DELETE_PATIENT, EDIT_PATIENT, FETCH_PATIENT_BY_ID, FETCH_PATIENTS } from '../types/patientType';

const initialState = {
    patient: null,
    patients: [],
};

export default function patientReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_PATIENTS:
            return { ...state, patients: action.payload };

        case FETCH_PATIENT_BY_ID:
            return { ...state, patient: action.payload };

        case ADD_PATIENT:
            return { ...state, patients: [...state.patients, action.payload] };

        case EDIT_PATIENT:
            return { ...state, patients: state.patients.map(patient => patient._id === action.payload._id ? { ...patient, ...action.payload } : patient) }

        case DELETE_PATIENT:
            return { ...state, patients: state.patients.filter(patient => patient._id !== action.payload) }
    }
}