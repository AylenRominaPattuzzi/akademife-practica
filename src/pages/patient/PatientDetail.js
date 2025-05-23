import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, editPatient } from '../../redux/actions/patientActions';
import { useNavigate, useParams } from 'react-router-dom';

import Input from '../../components/Input';
import { Message } from '../../components/Message';
import Button from '../../components/Button';
import Modal from '../../components/Model';
import FieldError from '../../components/FieldError';
import { validatePatient } from '../../utils/ValidateForm';

const PatientDetail = ({ patients, fetchPatients, editPatient }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dni, setDni] = useState('');
  const [email, setEmail] = useState('');
  const [medicalCoverage, setMedicalCoverage] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});

  const patient = patients?.find(p => p._id === id);

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validatePatient({ firstName, lastName, dni, email, medicalCoverage });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      return;
    }

    setFieldErrors({});
    editPatient(id, { firstName, lastName, dni, email, medicalCoverage });
    setDisabled(true);
    setShowMessage(true);

    setTimeout(() => navigate('/patients'), 2000);
  };

  const handleCancel = () => {
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
      {showMessage && (
        <Message message="Paciente editado con éxito" stateMessage="positive" />
      )}

      <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
        <div className="column" style={{ maxWidth: 450 }}>
          <div className="ui card fluid">
            <div className="content">
              <form className="ui form" onSubmit={handleSubmit} noValidate>
                <h2 className="ui header">Formulario Paciente</h2>

                <Input
                  label="Nombre"
                  type="text"
                  name="firstName"
                  value={firstName}
                  onChange={(e) => {
                    setFirstName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, firstName: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el nombre del paciente"
                />
                <FieldError message={fieldErrors.firstName} />

                <Input
                  label="Apellido"
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => {
                    setLastName(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, lastName: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el apellido del paciente"
                />
                <FieldError message={fieldErrors.lastName} />

                <Input
                  label="DNI"
                  type="text"
                  name="dni"
                  value={dni}
                  onChange={(e) => {
                    setDni(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, dni: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el DNI"
                />
                <FieldError message={fieldErrors.dni} />

                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese el correo"
                />
                <FieldError message={fieldErrors.email} />

                <Input
                  label="Obra Social"
                  type="text"
                  name="medicalCoverage"
                  value={medicalCoverage}
                  onChange={(e) => {
                    setMedicalCoverage(e.target.value);
                    setFieldErrors((prev) => ({ ...prev, medicalCoverage: '' }));
                  }}
                  disabled={disabled}
                  placeholder="Ingrese la obra social"
                />
                <FieldError message={fieldErrors.medicalCoverage} />

                <div>
                  {disabled ? (
                    <Button
                      type="button"
                      texto="Editar"
                      onClick={() => setDisabled(false)}
                    />
                  ) : (
                    <>
                      <Button
                        type="button"
                        texto="Cancelar"
                        color="red"
                        onClick={() => setOpen(true)}
                      />
                      <Button
                        type="submit"
                        texto="Guardar"
                        color="green"
                      />
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
          onConfirm={handleCancel}
          modalTitle="Cancelar edición"
          modalDescription={`¿Estás seguro de cancelar la edición del paciente ${firstName} ${lastName}?`}
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  patients: state.patient.patients,
});

const mapDispatchToProps = {
  fetchPatients,
  editPatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(PatientDetail);
