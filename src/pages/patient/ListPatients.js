import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, deletePatient } from '../../redux/actions/patientActions';
import Button from '../../components/Button';
import { Message } from '../../components/Message';
import { useNavigate } from 'react-router-dom';

const ListPatients = ({
    patients,
    isLoadingPatients,
    errorPatients,
    isDeletingPatient,
    errorDeletePatient,
    deletePatient,
    fetchPatients,
    totalPages
}) => {
    const [page, setPage] = useState(1);
    const [deletingPatientId, setDeletingPatientId] = useState(null);
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        fetchPatients(page);
    }, [fetchPatients, page]);

    const handleAddPatient = () => {
        navigate('/create-patient');
    };

    const handlePatient = (id) => {
        navigate(`/patient/${id}`);
    };

    const handleDeletePatient = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
            try {
                setDeletingPatientId(id);
                await deletePatient(id);
                setSuccessMessage('Paciente eliminado con éxito');
                setTimeout(() => setSuccessMessage(''), 2000);
                // No es necesario llamar fetchPatients aquí, porque el reducer actualiza la lista.
            } catch (err) {
                // El error ya viene del estado global errorDeletePatient, no hace falta manejar local.
            } finally {
                setDeletingPatientId(null);
            }
        }
    };

    return (
        <div className="ui segment">
            {successMessage && (
                <Message message={successMessage} stateMessage="positive" />
            )}
            {errorPatients && (
                <Message message={errorPatients} stateMessage="negative" />
            )}
            {errorDeletePatient && (
                <Message message={errorDeletePatient} stateMessage="negative" />
            )}

            <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
                <div className="column" style={{ width: '100%' }}>
                    <div className="ui card fluid">
                        <div className="content">
                            <Button texto="Agregar Paciente" type="button" onClick={handleAddPatient} color="green" />
                            <h2>Listado de Pacientes</h2>

                            <form className={`ui form ${isLoadingPatients ? 'loading' : ''}`}>
                                <table className="ui celled table">
                                    <thead>
                                        <tr>
                                            <th>Nombre</th>
                                            <th>Apellido</th>
                                            <th>DNI</th>
                                            <th>Obra Social</th>
                                            <th>Email</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {patients.length === 0 ? (
                                            <tr>
                                                <td colSpan="6">No hay pacientes</td>
                                            </tr>
                                        ) : (
                                            patients.map((p) => (
                                                <tr key={p._id}>
                                                    <td>{p.firstName}</td>
                                                    <td>{p.lastName}</td>
                                                    <td>{p.dni}</td>
                                                    <td>{p.medicalCoverage || '-'}</td>
                                                    <td>{p.email || '-'}</td>
                                                    <td>
                                                        <Button texto="Ver paciente" type="button" onClick={() => handlePatient(p._id)} />
                                                        <Button
                                                            texto={deletingPatientId === p._id && isDeletingPatient ? 'Eliminando...' : 'Eliminar Paciente'}
                                                            type="button"
                                                            disabled={deletingPatientId === p._id && isDeletingPatient}
                                                            onClick={() => handleDeletePatient(p._id)}
                                                            color="red"
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </table>
                            </form>

                            {totalPages > 1 && (
                                <div className="ui buttons">
                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
                                        <button
                                            key={pageNumber}
                                            className={`ui button ${pageNumber === page ? 'blue' : ''}`}
                                            onClick={() => setPage(pageNumber)}
                                        >
                                            {pageNumber}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Mapea estados desde Redux
const mapStateToProps = (state) => ({
    patients: Array.isArray(state.patient?.patients) ? state.patient.patients : [],
    isLoadingPatients: state.patient?.isLoadingPatients,
    errorPatients: state.patient?.errorPatients,
    isDeletingPatient: state.patient?.isDeletingPatient,
    errorDeletePatient: state.patient?.errorDeletePatient,
    totalPages: state.patient?.totalPages,
});

const mapDispatchToProps = {
    fetchPatients,
    deletePatient,
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPatients);

