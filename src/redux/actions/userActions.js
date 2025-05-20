import {
    REGISTER_REQUEST,
    REGISTER_SUCCESS,
    REGISTER_FAILURE,
    ADD_USER,
    EDIT_USER,
    DELETE_USER,
} from '../types/userTypes'

// Acciones básicas de registro
export const registerRequest = () => ({ type: REGISTER_REQUEST });

export const registerSuccess = (token, role, user) => ({
    type: REGISTER_SUCCESS,
    payload: { token, role, user },
});

export const registerFailure = (error) => ({
    type: REGISTER_FAILURE,
    payload: error,
});

// Acciones CRUD para usuarios

// Agregar un usuario (por ejemplo, al listado)
export const addUser = (user) => ({
    type: ADD_USER,
    payload: user,
});

// Editar un usuario (recibe objeto usuario actualizado)
export const editUser = (user) => ({
    type: EDIT_USER,
    payload: user,
});

// Eliminar usuario (por id)
export const deleteUser = (userId) => ({
    type: DELETE_USER,
    payload: { id: userId },
});
