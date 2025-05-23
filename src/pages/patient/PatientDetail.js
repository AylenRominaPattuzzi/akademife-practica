import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, editPatient } from '../../redux/actions/patientActions';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../components/Input';
import Button from '../../components/Button';
import FieldError from '../../components/FieldError';
import { Message } from '../../components/Message';
import Modal from '../../components/Model';
import { validatePatient } from '../../utils/ValidateForm';

const PatientDetail = ({
  patients,
  fetchPatients,
  editPatient,
  isLoadingPatients,
  isEditingPatient,
  errorEditPatient
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [medicalCoverage, setMedicalCoverage] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [open, setOpen] = useState(false);

  const patient = patients.find(p => p._id === id);

  useEffect(() => {
    if (patients.length === 0) fetchPatients();
  }, [fetchPatients, patients.length]);

  useEffect(() => {
    if (patient) {
      setFirstName(patient.firstName || '');
      setLastName(patient.lastName || '');
      setDni(patient.dni || '');
      setEmail(patient.email || '');
      setMedicalCoverage(patient.medicalCoverage || '');
    }
  }, [patient]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedPatient = { firstName, lastName, dni, email, medicalCoverage };
    const errors = validatePatient(updatedPatient);

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    await editPatient(id, updatedPatient);
    if (!isEditingPatient && !errorEditPatient) {
      setShowSuccessMessage(true);
      setDisabled(true);
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
        navigate('/patients');
      }, 2000);
      return () => clearTimeout(timer);
    }
  };

  const handleCancelEdit = () => {
    if (patient) {
      setFirstName(patient.firstName || '');
      setLastName(patient.lastName || '');
      setDni(patient.dni || '');
      setEmail(patient.email || '');
      setMedicalCoverage(patient.medicalCoverage || '');
    }
    setDisabled(true);
    setOpen(false);
  };

  return (
    <div className="ui segment">
      {showSuccessMessage && (
        <Message message="Paciente editado con éxito" stateMessage="positive" />
      )}

      {errorEditPatient && (
        <Message message={errorEditPatient} stateMessage="negative" />
      )}

      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui card fluid">
            <div className="content">
              <form
                className={`ui form ${isLoadingPatients || isEditingPatient ? 'loading' : ''}`}
                onSubmit={handleSubmit}
                noValidate
              >
                <h2 className="ui header">Formulario Paciente</h2>

                <Input
                  label="Nombre"
                  type="text"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFieldErrors(prev => ({ ...prev, firstName: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el nombre del paciente"
                />
                <FieldError message={fieldErrors.firstName} />

                <Input
                  label="Apellido"
                  type="text"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setFieldErrors(prev => ({ ...prev, lastName: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el apellido del paciente"
                />
                <FieldError message={fieldErrors.lastName} />

                <Input
                  label="DNI"
                  type="text"
                  value={dni}
                  onChange={(e) => {
                    setDni(e.target.value);
                    setFieldErrors(prev => ({ ...prev, dni: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el DNI"
                />
                <FieldError message={fieldErrors.dni} />

                <Input
                  label="Email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors(prev => ({ ...prev, email: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el correo"
                />
                <FieldError message={fieldErrors.email} />

                <Input
                  label="Obra Social"
                  type="text"
                  value={medicalCoverage}
                  onChange={(e) => {
                    setMedicalCoverage(e.target.value);
                    setFieldErrors(prev => ({ ...prev, medicalCoverage: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese la obra social"
                />
                <FieldError message={fieldErrors.medicalCoverage} />

                <div className="ui buttons">
                  {disabled ? (
                    <Button texto="Editar" type="button" onClick={() => setDisabled(false)} />
                  ) : (
                    <>
                      <Button texto="Cancelar" type="button" onClick={() => setOpen(true)} color="red" />
                      <Button texto="Guardar" type="submit" disabled={isEditingPatient} color="green" />
                    </>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {open && (
        <Modal
          onCancel={() => setOpen(false)}
          onConfirm={handleCancelEdit}
          modalTitle="Cancelar edición"
          modalDescription={`¿Estás seguro de cancelar la edición del paciente ${firstName} ${lastName}?`}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  patients: state.patient.patients,
  isLoadingPatients: state.patient.isLoadingPatients,
  isEditingPatient: state.patient.isEditingPatient,
  errorEditPatient: state.patient.errorEditPatient,
});

const mapDispatchToProps = {
  fetchPatients,
  editPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
