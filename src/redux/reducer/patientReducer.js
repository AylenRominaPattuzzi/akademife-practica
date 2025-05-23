import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,
  FETCH_PATIENT_BY_ID,
  ADD_PATIENT,
  EDIT_PATIENT,
  DELETE_PATIENT
} from '../types/patientType';

const initialState = {
  patient: null,
  patients: [],
  isLoadingPatients: false,
  errorPatients: '',
  totalPages: 0
};

export default function patientReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PATIENTS_REQUEST:
      return { ...state, isLoadingPatients: true, errorPatients: '' };

      case FETCH_PATIENTS_SUCCESS:
        
        
        return {
          ...state,
          isLoadingPatients: false,
          patients: Array.isArray(action.payload.data) ? action.payload.data : [],
          totalPages: action.payload.totalPages
        };

    case FETCH_PATIENTS_FAILURE:
      return { ...state, isLoadingPatients: false, errorPatients: action.payload };

    case FETCH_PATIENT_BY_ID:
      return { ...state, patient: action.payload };

    case ADD_PATIENT:
      return { ...state, patients: [...state.patients, action.payload] };

    case EDIT_PATIENT:
      return { ...state, patients: state.patients.map((p) => p._id === action.payload._id ? { ...p, ...action.payload } : p) };

    case DELETE_PATIENT:
      return { ...state, patients: state.patients.filter((p) => p._id !== action.payload) };

    default:
      return state;
  }
}
