import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import FieldError from '../../components/FieldError';
import { connect } from 'react-redux';
import { recoverPassword } from '../../redux/actions/userActions';
import { validateForm } from '../../utils/formUtils';
import { Message } from '../../components/Message';

const RecoverPassword = ({ user, recoverPassword }) => {
  const [email, setEmail] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Limpia el campo email tras éxito
  useEffect(() => {
    if (user.recoverPasswordSuccess) {
      setEmail('');
    }
  }, [user.recoverPasswordSuccess]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (user.recoverPasswordLoading) return;

    // Validamos solo el email
    const errors = validateForm({ email }, ['email']);
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    recoverPassword(email);
  };

  return (
    <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
      <div className="column" style={{ maxWidth: 450 }}>
        <div className="ui card fluid">
          <div className="content">
            <form className="ui form" onSubmit={handleSubmit} noValidate>
              <h2 className="ui header">Recuperar Contraseña</h2>

              {user.recoverPasswordError && (
                <div className="ui red message">{user.recoverPasswordError}</div>
              )}

              {user.recoverPasswordSuccess && (
                <Message
                  message="Revisa tu email para restablecer la contraseña."
                  stateMessage="positive"
                />
              )}

              <Input
                label="Correo electrónico"
                type="email"
                placeholder="Ingrese su correo electrónico"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setFieldErrors((prev) => ({ ...prev, email: '' }));
                }}
                disabled={user.recoverPasswordLoading}
              />
              <FieldError message={fieldErrors.email} />

              <Button
                type="submit"
                texto={user.recoverPasswordLoading ? 'Enviando...' : 'Enviar'}
                disabled={user.recoverPasswordLoading}
              />
            </form>

            {user.recoverPasswordLoading && <Loading />}
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.register || {}, 
});

const mapDispatchToProps = {
  recoverPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(RecoverPassword);
