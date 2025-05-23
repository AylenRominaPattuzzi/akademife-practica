import {
    FETCH_DOCTORS_REQUEST,
    FETCH_DOCTORS_SUCCESS,
    FETCH_DOCTORS_FAILURE,
    FETCH_DOCTOR_BY_ID,
    ADD_DOCTOR,
    EDIT_DOCTOR,
    DELETE_DOCTOR
  } from '../types/doctorType';
  
  const initialState = {
    doctor: null,
    doctors: [],
    isLoadingDoctors: false,
    errorDoctors: '',
    totalPages: 0
  };
  
  export default function doctorReducer(state = initialState, action) {
    switch (action.type) {
      case FETCH_DOCTORS_REQUEST:
        return { ...state, isLoadingDoctors: true, errorDoctors: '' };
  
      case FETCH_DOCTORS_SUCCESS:
        return {
          ...state,
          isLoadingDoctors: false,
          doctors: Array.isArray(action.payload.data) ? action.payload.data : [],
          totalPages: action.payload.totalPages
        };
  
      case FETCH_DOCTORS_FAILURE:
        return { ...state, isLoadingDoctors: false, errorDoctors: action.payload };
  
      case FETCH_DOCTOR_BY_ID:
        return { ...state, doctor: action.payload };
  
      case ADD_DOCTOR:
        return { ...state, doctors: [...state.doctors, action.payload] };
  
      case EDIT_DOCTOR:
        return {
          ...state,
          doctors: state.doctors.map((d) =>
            d._id === action.payload._id ? { ...d, ...action.payload } : d
          )
        };
  
      case DELETE_DOCTOR:
        return {
          ...state,
          doctors: state.doctors.filter((d) => d._id !== action.payload)
        };
  
      default:
        return state;
    }
  }
  