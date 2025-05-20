import React, { useState, useEffect } from 'react';
import Input from '../components/Input'; 
import Button from '../components/Button'; 
import Loading from '../components/Loading'; 
import FieldError from '../components/FieldError'; 
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loginUser } from '../features/auth';
import { validateForm, guardarTokenYRedirigir } from '../utils/formUtils';

const Login = ({ auth, loginUser }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState({}); 

  const navigate = useNavigate(); 

  // useEffect que escucha si el usuario ya inició sesión correctamente
  useEffect(() => {
    if (auth && auth.token) {
      // Guarda token en localStorage y redirige
      guardarTokenYRedirigir(auth, navigate);
    }
  }, [auth, navigate]);

  // Maneja el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault(); 

    //Previene múltiples envíos si ya se está cargando
    if (auth.loading) return;

    // Valida el formulario con función externa
    const errors = validateForm(email, password);

    // Si hay errores, los setea en el estado y no continúa
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    // Si no hay errores, borra errores anteriores y despacha acción de login
    setFieldErrors({});
    loginUser({ email, password });
  };

  return (
    <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
      <div className="column" style={{ maxWidth: 450 }}>
        <div className="ui card fluid">
          <div className="content">
            <form className="ui form" onSubmit={handleSubmit} noValidate>
              <h2 className="ui header">Iniciar sesión</h2>
              {auth.error && <div className="ui red message">{auth.error}</div>}
              <Input
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: '' })); // Limpia error de ese campo
                }}
              />
              <FieldError message={fieldErrors.email} />

              <Input
                label="Contraseña"
                type="password"
                placeholder="Ingrese su contraseña"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, password: '' })); // Limpia error de ese campo
                }}
              />
              <FieldError message={fieldErrors.password} />

              <Button type="submit" texto={auth.loading ? 'Cargando...' : 'Ingresar'} />
            </form>

            {auth.loading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mapea el estado global (Redux) al componente como props
const mapStateToProps = (state) => ({
  auth: state.auth || {}, // Asegura que haya un objeto incluso si es undefined
});

// Mapea la acción de login como prop
const mapDispatchToProps = {
  loginUser,
};

// Exporta el componente conectado a Redux
export default connect(mapStateToProps, mapDispatchToProps)(Login);

