import React, { useState, useEffect } from 'react';
import Input from '../components/Input'; // Campo de texto con estilos
import Button from '../components/Button'; // Botón personalizado
import Loading from '../components/Loading'; // Indicador de carga
import FieldError from '../components/FieldError'; // Muestra errores debajo de los inputs
import { useNavigate } from 'react-router-dom'; // Para redirigir a otras rutas
import { connect } from 'react-redux'; // Conecta el componente a Redux
import { validateForm } from '../utils/formUtils';

const Register = () => {
  return (
    <div>Register</div>
  )
}

export default Register