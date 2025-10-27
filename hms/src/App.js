import React from 'react';
import './App.css';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import { AuthContext } from './store/Context';
import { FirebaseContext } from './store/Context';
import { onAuthStateChanged } from 'firebase/auth';
import {useEffect } from 'react';
import { useContext } from 'react';
import { auth } from './Firebase/Config';
/**
 * ?  =====Import Components=====
 */
import Home from './Pages/Home';
import Login from './Pages/Login'

import AdminLogin from './Components/Admin/AdminLogin';
import Dashboard from './Components/Admin/Dashboard';
import AddDoctor from './Components/Admin/AddDoctor';
import Signup from './Components/Signup/Signup';
import UserDashboard from './Components/Appointments/UserDashboard';
import AppointmentForm from './Components/Appointments/AppointmentForm';
import AllDoctor from './Components/Doctors/AllDoctor';
import AllAppointments from './Components/Appointments/AllAppointments';
import AllUsers from './Components/Admin/AllUsers';
import DoctorLogin from './Components/Doctors/DoctorLogin';
import DoctorDashboard from './Components/Doctors/DoctorDashboard';
import DoctorPrescription from './Components/Doctors/DoctorPrescription';
import PharmacistLogin from './Components/Pharmacist/PharmacistLogin';
import PharmacistViewPrescription from './Components/Pharmacist/PharmacistViewPrescription';
import AddPharmacist from './Components/Admin/AddPharmacist';
import AllPharmacist from './Components/Pharmacist/AllPharmacist';
import AllPrescription from './Components/Doctors/AllPrescription';
import AddBloodForm from './Components/Admin/AddBloodForm';
import BloodBankView from './Components/Admin/BloodBankView';
function App() {

  const {user,setUser}=useContext(AuthContext)
  const {firebase}=useContext(FirebaseContext)
  
  useEffect(()=>{
 
   onAuthStateChanged(auth, (user) => {
 if (user) {
   setUser(user);  
   console.log("user is",user)
   console.log("firebase is",firebase) 
   const uid = user.uid;
         
 } else {
   // User is signed out
 
 }
});
   

  })


  return (
    <div>
        <Router>  
    <Routes>
    <Route exact path="/" element={<><Home/></>}/>
    <Route  path="/signup" element={<><Signup/></>}/>
    <Route  path="/login" element={<><Login/></>}/>
    <Route  path="/appointment" element={<><UserDashboard/></>}/>
    <Route  path="/appointmentform" element={<><AppointmentForm/></>}/>

    <Route  path="/doctor-login" element={<><DoctorLogin/></>}/>
    <Route  path="/doctor-dashboard" element={<><DoctorDashboard/></>}/>
    <Route  path="/doctor-prescription" element={<><DoctorPrescription/></>}/>
    
    
    <Route  path="/pharmacist-login" element={<><PharmacistLogin/></>}/>
    <Route  path="/pharmacist-view-prescrition" element={<><PharmacistViewPrescription/></>}/>

    
    <Route  path="/adminlogin" element={<><AdminLogin/></>}/>
    <Route  path="/dashboard" element={<><Dashboard/></>}/>
    <Route  path="dashboard/add-doctor" element={<><AddDoctor/></>}/>
    <Route  path="dashboard/add-blood" element={<><AddBloodForm/></>}/>
    <Route  path="dashboard/add-pharmacist" element={<><AddPharmacist/></>}/>
    <Route  path="dashboard/all-pharmacist" element={<><AllPharmacist/></>}/>
    <Route  path="dashboard/all-prescription" element={<><AllPrescription/></>}/>
    <Route  path="dashboard/all-doctor" element={<><AllDoctor/></>}/>
    <Route  path="dashboard/all-appointment" element={<><AllAppointments/></>}/>
    <Route  path="dashboard/all-user" element={<><AllUsers/></>}/>
    <Route  path="dashboard/blood-bank" element={<><BloodBankView/></>}/>
      
      </Routes>
     </Router>
    


      </div>
  );
}

export default App;
