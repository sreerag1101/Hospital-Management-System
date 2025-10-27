import { useState,useContext } from 'react';
import React from 'react'
import AppointmentForm from './AppointmentForm';
import BG from '../../assets/hbackground.webp'
import { AuthContext } from '../../store/Context';
import ViewAppointments from './ViewAppointments';
function UserDashboard() {
  const {user} =useContext(AuthContext);
  const backgroundImageUrl = `url(${BG})`;
  const [currentComponent, setCurrentComponent] = useState(null);
  return (
    <div> 
      <p>{user?user.email:<p>No user</p>}</p>  
      <div style={{ backgroundImage: backgroundImageUrl, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

        <button  type="button" onClick={() => setCurrentComponent(<AppointmentForm />)}  class="btn btn-dark btn-lg" > Take an Appoint </button>
        <br/>
        <button  type="button"   onClick={() => setCurrentComponent(<ViewAppointments />)}      class="btn btn-dark btn-lg" >View Appoint</button>
      </div>
    </div>
    
        {currentComponent}

    </div>
  )
}

export default UserDashboard