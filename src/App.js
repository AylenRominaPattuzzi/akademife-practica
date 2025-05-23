import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import CreatePatient from './pages/patient/CreatePatient';
import ListPatients from './pages/patient/ListPatients';
import Patient from './pages/patient/PatientDetail';
import Nadvar from './components/Nadvar';


const App = () => {
  return (
    <div className='ui container'>
      <Nadvar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/patients" element={<ListPatients />} />
        <Route path="/patient/:id" element={<Patient />} />
        <Route path="/create-patient" element={<CreatePatient />} />
        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
