import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPatients, deletePatient } from '../../redux/actions/patientActions';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

const ListPatients = ({ patients = [], isLoading, error, fetchPatients, deletePatient, totalPages }) => {

    const [page, setPage] = useState(1)

    useEffect(() => {
        fetchPatients(page);
    }, [fetchPatients, page]);

    const navigate = useNavigate();

    const handleAddPatient = () => {
        navigate('/create-patient');
    };

    const handlePatient = (id) => {
        navigate(`/patient/${id}`);
    };

    const handleDeletePatient = async (id) => {
        if (window.confirm('¿Estás seguro de eliminar este paciente?')) {
            await deletePatient(id);
            fetchPatients();
        }
    };

    if (isLoading) return <p>Cargando pacientes...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div className="ui middle aligned center aligned grid" style={{ height: '100vh' }}>
            <div className="column" style={{ width: '100%' }}>
                <div className="ui card fluid">
                    <div className="content">
                        <Button
                            texto='Agregar Paciente'
                            type='button'
                            onClick={handleAddPatient}
                            color='green'
                        />
                        <h2>Listado de Pacientes</h2>
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
                                    <tr><td colSpan="6">No hay pacientes</td></tr>
                                ) : (
                                    patients.map(p => (
                                        <tr key={p._id}>
                                            <td>{p.firstName}</td>
                                            <td>{p.lastName}</td>
                                            <td>{p.dni}</td>
                                            <td>{p.medicalCoverage || '-'}</td>
                                            <td>{p.email || '-'}</td>
                                            <td>
                                                <Button
                                                    texto='Ver paciente'
                                                    type='button'
                                                    onClick={() => handlePatient(p._id)}
                                                />
                                                <Button
                                                    texto='Eliminar Paciente'
                                                    type='button'
                                                    onClick={() => handleDeletePatient(p._id)}
                                                    color='red'
                                                />
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
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
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapStateToProps = (state) => ({
    patients: Array.isArray(state.patient?.patients) ? state.patient?.patients : [],
    isLoading: state.patient?.isLoadingPatients,
    error: state.patient?.errorPatients,
    totalPages: state.patient?.totalPages
});

const mapDispatchToProps = {
    fetchPatients,
    deletePatient
};

export default connect(mapStateToProps, mapDispatchToProps)(ListPatients);
