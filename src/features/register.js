import {
  registerRequest,
  registerSuccess,
  registerFailure,
  addUser,
  editUser,
  deleteUser,
} from '../redux/actions/authActions';

// 🔐 Registro de usuario
export const registerUserThunk = (userData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch('http://localhost:3000/api/user/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al registrar usuario');

      dispatch(registerSuccess(null, null, data)); // `data` contiene el usuario registrado
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// 👤 Obtener usuario por ID
export const fetchUserByIdThunk = (userId) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`, // si necesitas token
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al obtener usuario');

      dispatch(addUser(data));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// ✏️ Editar usuario
export const editUserThunk = (userId, updatedData) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(updatedData),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al editar usuario');

      dispatch(editUser(data));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// 🗑️ Eliminar usuario
export const deleteUserThunk = (userId) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al eliminar usuario');

      dispatch(deleteUser(userId));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// 🔁 Recuperar contraseña
export const recoverPasswordThunk = (email) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch('http://localhost:3000/api/user/recover', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al recuperar contraseña');

      // Podrías despachar una acción tipo recoverSuccess si la defines
      dispatch(registerSuccess(null, null, data.message));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};

// 🔒 Resetear contraseña
export const resetPasswordThunk = (token, newPassword) => {
  return async (dispatch) => {
    dispatch(registerRequest());
    try {
      const response = await fetch(`http://localhost:3000/api/user/reset/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Error al resetear contraseña');

      dispatch(registerSuccess(data.token, data.role, null));
    } catch (error) {
      dispatch(registerFailure(error.message));
    }
  };
};
