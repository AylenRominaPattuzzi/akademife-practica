import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
} from '../types/userTypes';

const initialState = {
  loading: false,
  token: null,
  role: null,
  user: null,  // usuario registrado
  users: [],   // lista de usuarios (para agregar, editar, eliminar)
  error: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { ...state, loading: true, error: null };

    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        token: action.payload.token,
        role: action.payload.role,
        user: action.payload.user,
        error: null,
      };

    case REGISTER_FAILURE:
      return { ...state, loading: false, error: action.payload };

    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case EDIT_USER:
      return {
        ...state,
        users: state.users.map(user =>
          user._id === action.payload._id ? { ...user, ...action.payload } : user
        ),
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter(user => user._id !== action.payload.id),
      };
    default:
      return state;
  }
}
