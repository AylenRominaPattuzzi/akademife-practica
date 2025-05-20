export const validateForm = (email, password) => {
    const errors = {};
    if (!email) errors.email = 'El email es obligatorio';
    if (!password) errors.password = 'La contraseña es obligatoria';
    return errors;
  };
  
  export const guardarTokenYRedirigir = (auth, navigate) => {
    localStorage.setItem('token', auth.token);
    localStorage.setItem('role', auth.role);
    navigate('/dashboard');
  };
  