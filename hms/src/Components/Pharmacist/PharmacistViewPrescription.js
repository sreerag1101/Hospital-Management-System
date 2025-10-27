import React from 'react';
import './PharmacistViewPrescription.css';
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc } from 'firebase/firestore';
import  pimg from '../../assets/p1.webp'
function PharmacistViewPrescription() {

    const {data:productData,loading} =useGetdata('Prescription')
    const deletePrescription= async id=>{
      await deleteDoc(doc(db,'Prescription',id));
  
    }




  return (
    <div>
     {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
  <div class="container">

    <div class="profile">
      <img src={pimg} height='200px' width='200px' alt="Profile Picture"/>
      <div>
        <p> Patient ID : {item.id}</p>
        <h4>Patient Name : {item.patientName}</h4>
        <p>Age : {item.patientAge}</p>
      </div>
    </div>
    <div class="orders">
      <h2> Prescription</h2>
      <ul>
        <li>
          <div>
            <p>Disease : {item.disease}</p>
            <p>Medicine : {item.medicine}</p>
            <p>Date For Next Visit : {item.nextDateForVisit}</p>
            
            
          </div>
        </li>
          <h3>Contact Information</h3>
         <li>     
          <div>
             <p>Email : {item.patientEmail}</p>
        <p>Phone : {item.phone}</p>
          <button type="button" onClick={()=>{deletePrescription(item.ID);}}  class="btn btn-dark btn-lg" >Remove Prescription</button>
          </div>
        </li>
      </ul>
    </div>
  
  </div>

))
}
    </div>
);
}

export default PharmacistViewPrescription;
