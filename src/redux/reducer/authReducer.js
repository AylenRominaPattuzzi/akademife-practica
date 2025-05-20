import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE} from '../types/authTypes';

const initialState = {
    loading: false,
    token: null,
    role: null,
    error: null,
};

export default function authReducer(state = initialState, action) {
    switch (action.type) {
        case LOGIN_REQUEST:
            return { ...state, loading: true, error: null };
        case LOGIN_SUCCESS:
            return { ...state, loading: false, token: action.payload.token, role: action.payload.role, error: null };
        case LOGIN_FAILURE:
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
}


  

  