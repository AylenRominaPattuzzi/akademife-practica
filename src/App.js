import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { checkAuthThunk } from './redux/actions/authActions';

import Login from './pages/User/Login';
import RecoverPassword from './pages/User/RecoverPassword';
import ResetPassword from './pages/User/ResetPassword';
import CreatePatient from './pages/patient/CreatePatient';
import ListPatients from './pages/patient/ListPatients';
import Patient from './pages/patient/PatientDetail';
import Nadvar from './components/Nadvar';
import Dashboard from './pages/Dashboard';
import PrivateRoute from './components/PrivateRoute'; 

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthThunk()); // importante
  }, [dispatch]);

  return (
    <div className="ui container">
      <Nadvar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/recover-password" element={<RecoverPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />

        {/* Rutas protegidas */}
        <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/patients" element={<PrivateRoute><ListPatients /></PrivateRoute>} />
        <Route path="/patient/:id" element={<PrivateRoute><Patient /></PrivateRoute>} />
        <Route path="/create-patient" element={<PrivateRoute><CreatePatient /></PrivateRoute>} />

        <Route path="/" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;
