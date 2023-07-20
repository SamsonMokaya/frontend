import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Doctor_login_page from './pages/Login.jsx';
import Pharmacist_login_page from './pages/Login2.jsx';
import DoctorPrescription from './pages/doctor/Prescription.jsx';
import DoctorPatients from './pages/doctor/Patients.jsx';
import DoctorProfile from './pages/doctor/Profile.jsx';
import DoctorMedicine from './pages/doctor/Medicine.jsx';
import PharmacistPrescription from './pages/pharmacist/Prescription.jsx';
import PharmacistProfile from './pages/pharmacist/Profile.jsx';
import PharmacistMedicine from './pages/pharmacist/Medicine.jsx';

import {BrowserRouter, Routes, Route} from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <Routes>
    <Route path = "/" element = {<App />}/>
    <Route path = "/doctor_login" element = {<Doctor_login_page />}/>
    <Route path = "/pharmacist_login" element = {<Pharmacist_login_page />}/>
    <Route path = "/doctor/patient" element = {<DoctorPatients/>}/>
    <Route path = "/doctor/prescription" element = {<DoctorPrescription />}/>
    <Route path = "/doctor/medicine" element = {<DoctorMedicine />}/>
    <Route path = "/doctor/profile" element = {<DoctorProfile />}/>
    <Route path = "/pharmacist/prescription" element = {<PharmacistPrescription />}/>
    <Route path = "/pharmacist/medicine" element = {<PharmacistMedicine />}/>
    <Route path = "/pharmacist/profile" element = {<PharmacistProfile />}/>
  </Routes>
</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
