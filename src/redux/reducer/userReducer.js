import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER_BY_ID,
  RECOVER_PASSWORD_REQUEST,
  RECOVER_PASSWORD_SUCCESS,
  RECOVER_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
} from '../types/userTypes';

const initialState = {
  user: null,
  users: [],
  recoverPasswordLoading: false,
  recoverPasswordError: null,
  recoverPasswordSuccess: false,

  resetPasswordLoading: false,
  resetPasswordError: null,
  resetPasswordSuccess: false,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, users: action.payload };

    case FETCH_USER_BY_ID:
      return { ...state, user: action.payload };

    case ADD_USER:
      return { ...state, users: [...state.users, action.payload] };

    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user
        )
      };

    case DELETE_USER:
      return { ...state, users: state.users.filter(user => user._id !== action.payload) };

    // RECOVER PASSWORD
    case RECOVER_PASSWORD_REQUEST:
      return { ...state, recoverPasswordLoading: true, recoverPasswordError: null, recoverPasswordSuccess: false };

    case RECOVER_PASSWORD_SUCCESS:
      return { ...state, recoverPasswordLoading: false, recoverPasswordSuccess: true };

    case RECOVER_PASSWORD_FAILURE:
      return { ...state, recoverPasswordLoading: false, recoverPasswordError: action.payload };

    // RESET PASSWORD
    case RESET_PASSWORD_REQUEST:
      return { ...state, resetPasswordLoading: true, resetPasswordError: null, resetPasswordSuccess: false };

    case RESET_PASSWORD_SUCCESS:
      return { ...state, resetPasswordLoading: false, resetPasswordSuccess: true };

    case RESET_PASSWORD_FAILURE:
      return { ...state, resetPasswordLoading: false, resetPasswordError: action.payload };

    default:
      return state;
  }
}
