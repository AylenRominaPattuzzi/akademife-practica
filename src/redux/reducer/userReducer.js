import {
  ADD_USER,
  EDIT_USER,
  DELETE_USER,
  FETCH_USERS,
  FETCH_USER_BY_ID
} from '../types/userTypes';

const initialState = {
  user: null,   // usuario individual (por ejemplo, al ver un perfil)
  users: [],    // lista completa de usuarios
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
      return { ...state, users: state.users.map(user => user._id === action.payload._id ? { ...user, ...action.payload } : user ) };

    case DELETE_USER:
      return { ...state, users: state.users.filter(user => user._id !== action.payload) };

    default:
      return state;
  }
}
