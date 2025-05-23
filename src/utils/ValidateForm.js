export const validatePatient = (data) => {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const dniRegex = /^\d{7,10}$/;

  if (!data.firstName || data.firstName.trim() === '') {
    errors.firstName = 'El nombre es requerido';
  }

  if (!data.lastName || data.lastName.trim() === '') {
    errors.lastName = 'El apellido es requerido';
  }

  if (!data.dni || data.dni.trim() === '') {
    errors.dni = 'El DNI es requerido';
  } else if (!dniRegex.test(data.dni)) {
    errors.dni = 'El formato del DNI es inválido';
  }

  if (data.email && !emailRegex.test(data.email)) {
    errors.email = 'El formato del email es inválido';
  }

  return errors;
};

export const validateLogin = ({ email, password }) => {
  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  if (!password || password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  }

  return errors;
};


export const validateRecoverPassword = ({ email }) => {
  const errors = {};

  if (!email || email.trim() === '') {
    errors.email = 'El correo electrónico es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = 'El correo electrónico no es válido';
  }

  return errors;
};


export const validateResetPassword = ({ password }) => {
  const errors = {};

  if (!password || password.trim() === '') {
    errors.password = 'La contraseña es obligatoria';
  } else if (password.length < 8) {
    errors.password = 'La contraseña debe tener al menos 8 caracteres';
  }

  return errors;
};
