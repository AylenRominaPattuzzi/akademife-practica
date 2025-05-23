import {
  FETCH_PATIENTS_REQUEST,
  FETCH_PATIENTS_SUCCESS,
  FETCH_PATIENTS_FAILURE,

  ADD_PATIENT_REQUEST,
  ADD_PATIENT_SUCCESS,
  ADD_PATIENT_FAILURE,

  EDIT_PATIENT_REQUEST,
  EDIT_PATIENT_SUCCESS,
  EDIT_PATIENT_FAILURE,

  DELETE_PATIENT_REQUEST,
  DELETE_PATIENT_SUCCESS,
  DELETE_PATIENT_FAILURE,

  FETCH_PATIENT_BY_ID_REQUEST,
  FETCH_PATIENT_BY_ID_SUCCESS,
  FETCH_PATIENT_BY_ID_FAILURE,
} from '../types/patientType';

const initialState = {
  patient: null,
  patients: [],
  totalPages: 0,

  isLoadingPatients: false,
  errorPatients: '',

  isAddingPatient: false,
  errorAddPatient: '',

  isEditingPatient: false,
  errorEditPatient: '',

  isDeletingPatient: false,
  errorDeletePatient: '',

  isLoadingPatientById: false,
  errorPatientById: '',
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
        totalPages: action.payload.totalPages,
      };

    case FETCH_PATIENTS_FAILURE:
      return { ...state, isLoadingPatients: false, errorPatients: action.payload };

    case ADD_PATIENT_REQUEST:
      return { ...state, isAddingPatient: true, errorAddPatient: '' };

    case ADD_PATIENT_SUCCESS:
      return {
        ...state,
        isAddingPatient: false,
        patients: [...state.patients, action.payload],
      };

    case ADD_PATIENT_FAILURE:
      return { ...state, isAddingPatient: false, errorAddPatient: action.payload };

    case EDIT_PATIENT_REQUEST:
      return { ...state, isEditingPatient: true, errorEditPatient: '' };

    case EDIT_PATIENT_SUCCESS:
      return {
        ...state,
        isEditingPatient: false,
        patients: state.patients.map((p) =>
          p._id === action.payload._id ? { ...p, ...action.payload } : p
        ),
      };

    case EDIT_PATIENT_FAILURE:
      return { ...state, isEditingPatient: false, errorEditPatient: action.payload };

    case DELETE_PATIENT_REQUEST:
      return { ...state, isDeletingPatient: true, errorDeletePatient: '' };

    case DELETE_PATIENT_SUCCESS:
      return {
        ...state,
        isDeletingPatient: false,
        patients: state.patients.filter((p) => p._id !== action.payload),
      };

    case DELETE_PATIENT_FAILURE:
      return { ...state, isDeletingPatient: false, errorDeletePatient: action.payload };

    case FETCH_PATIENT_BY_ID_REQUEST:
      return { ...state, isLoadingPatientById: true, errorPatientById: '', patient: null };

    case FETCH_PATIENT_BY_ID_SUCCESS:
      return { ...state, isLoadingPatientById: false, patient: action.payload };

    case FETCH_PATIENT_BY_ID_FAILURE:
      return { ...state, isLoadingPatientById: false, errorPatientById: action.payload };

    default:
      return state;
  }
}
