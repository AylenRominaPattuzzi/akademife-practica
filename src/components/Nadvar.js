import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { logoutUser } from '../redux/actions/authActions';

const Nadvar = ({ role, logoutUser }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  const isActive = (path) => (location.pathname === path ? 'active' : '');

  // Si no hay rol, no mostramos el navbar (usuario no logueado)
  if (!role) return null;

  return (
    <div className="ui container">
      <div className="ui secondary pointing menu">
        <a className={`item ${isActive('/dashboard')}`} href="/dashboard">Página Principal</a>
        <a className={`item ${isActive('/patients')}`} href="/patients">Pacientes</a>
        <a className={`item ${isActive('/doctors')}`} href="/doctors">Doctores</a>
        <a className={`item ${isActive('/appointments')}`} href="/appointments">Turnos</a>

        {role === 'admin' && (
          <a className={`item ${isActive('/users')}`} href="/users">Usuarios</a>
        )}

        <div className="right menu">
          <div className="item">
            <button className="ui red button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Nadvar);
