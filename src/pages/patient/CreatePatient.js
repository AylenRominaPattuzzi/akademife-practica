import React, { useState, useEffect } from 'react';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { connect } from 'react-redux';
import { addPatient } from '../../redux/actions/patientActions';
import { validatePatient } from '../../utils/ValidateForm';
import FieldError from '../../components/FieldError';
import { useNavigate } from 'react-router-dom';
import { Message } from '../../components/Message';

const CreatePatient = ({
  addPatient,
  isAddingPatient,
  errorAddPatient
}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [medicalCoverage, setMedicalCoverage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const patientData = { firstName, lastName, dni, email, medicalCoverage };
    const errors = validatePatient(patientData);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    await addPatient(patientData);

    if (!errorAddPatient) {
      setShowSuccessMessage(true);
      setTimeout(() => navigate('/patients'), 2000);
    }
  };

  useEffect(() => {
    if (errorAddPatient) {
      setShowSuccessMessage(false);
    }
  }, [errorAddPatient]);

  return (
    <div className="ui segment">
      {showSuccessMessage && (
        <Message message="Paciente agregado con éxito" stateMessage="positive" />
      )}

      {errorAddPatient && (
        <Message message={errorAddPatient} stateMessage="negative" />
      )}

      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui card fluid">
            <div className="content">
              <form className={`ui form ${isAddingPatient ? 'loading' : ''}`} onSubmit={handleSubmit} noValidate>
                <h2 className="ui header">Formulario Paciente</h2>

                <Input
                  label="Nombre"
                  type="text"
                  placeholder="Ingrese el nombre del paciente"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, firstName: '' }));
                  }}
                />
                <FieldError message={fieldErrors.firstName} />

                <Input
                  label="Apellido"
                  type="text"
                  placeholder="Ingrese el apellido del paciente"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, lastName: '' }));
                  }}
                />
                <FieldError message={fieldErrors.lastName} />

                <Input
                  label="DNI"
                  type="text"
                  placeholder="Ingrese el DNI del paciente"
                  value={dni}
                  onChange={(e) => {
                    setDni(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, dni: '' }));
                  }}
                />
                <FieldError message={fieldErrors.dni} />

                <Input
                  label="Email"
                  type="email"
                  placeholder="Ingrese el email del paciente"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                  }}
                />
                <FieldError message={fieldErrors.email} />

                <Input
                  label="Obra Social"
                  type="text"
                  placeholder="Ingrese la obra social del paciente"
                  value={medicalCoverage}
                  onChange={(e) => {
                    setMedicalCoverage(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, medicalCoverage: '' }));
                  }}
                />
                <FieldError message={fieldErrors.medicalCoverage} />

                <Button type="submit" texto="Enviar" disabled={isAddingPatient} />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mapea los estados de carga y error desde Redux
const mapStateToProps = (state) => ({
  isAddingPatient: state.patient.isAddingPatient,
  errorAddPatient: state.patient.errorAddPatient,
});

const mapDispatchToProps = {
  addPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePatient);
