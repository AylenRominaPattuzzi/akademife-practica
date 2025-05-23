import React, { useState } from 'react'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { connect } from 'react-redux';
import { addPatient } from '../../redux/actions/patientActions';
import { validateForm } from '../../utils/formUtils';
import FieldError from '../../components/FieldError';
import { useNavigate } from 'react-router-dom';

const Patient = ({ addPatient }) => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [dni, setDni] = useState('')
    const [email, setEmail] = useState('')
    const [medicalCoverage, setMedicalCoverage] = useState('')
    const [fieldErrors, setFieldErrors] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();

        const errors = validateForm(
            { firstName, lastName, dni, email, medicalCoverage },
            ['firstName', 'lastName', 'dni']
        );

        if (Object.keys(errors).length > 0) {
            setFieldErrors(errors);
            return;
        }

        setFieldErrors({});
        addPatient({ firstName, lastName, dni, email, medicalCoverage });
    };

    const navigate = useNavigate();
    const handleListPatient = () => {
        navigate('/patients');
    };

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ maxWidth: 450 }}>
                <div className="ui card fluid">
                    <div className="content">
                        <form className="ui form" onSubmit={handleSubmit} noValidate>
                            <h2 className="ui header">Formulario Paciente</h2>
                            <Input
                                label='Nombre'
                                type='text'
                                placeholder='Ingrese el nombre del paciente'
                                value={firstName}
                                onChange={(e) => {
                                    setFirstName(e.target.value);
                                    setFieldErrors((prev) => ({ ...prev, firstName: '' })); // Limpia error de ese campo
                                }}

                            />
                            <FieldError message={fieldErrors.firstName} />
                            <Input
                                label='Apellido'
                                type='text'
                                placeholder='Ingrese el apellido del paciente'
                                value={lastName}
                                onChange={(e) => {
                                    setLastName(e.target.value)
                                    setFieldErrors((prev) => ({ ...prev, lastName: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.lastName} />
                            <Input
                                label='DNI'
                                type='text'
                                placeholder='Ingrese el DNI del paciente'
                                value={dni}
                                onChange={(e) => {
                                    setDni(e.target.value)
                                    setFieldErrors((prev) => ({ ...prev, dni: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.dni} />
                            <Input
                                label='Email'
                                type='email'
                                placeholder='Ingrese el email del paciente'
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value)
                                    setFieldErrors((prev) => ({ ...prev, email: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.email} />

                            <Input
                                label='Obra Social'
                                type='text'
                                placeholder='Ingrese la obra social del paciente'
                                value={medicalCoverage}
                                onChange={(e) => {
                                    setMedicalCoverage(e.target.value)
                                    setFieldErrors((prev) => ({ ...prev, medicalCoverage: '' }));
                                }}
                            />
                            <FieldError message={fieldErrors.medicalCoverage} />
                            <Button type="submit" texto='Enviar' onClick={handleListPatient} />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatchToProps = {
    addPatient
}
export default connect(null, mapDispatchToProps)(Patient);

