import React from 'react'
import './ViewAppointments.css'
import pimg from '../../assets/p1.webp'
import { useEffect,useState } from 'react';
import { collection,where,query,getDocs,doc,deleteDoc } from 'firebase/firestore';
import { AuthContext } from '../../store/Context';
import { auth } from '../../Firebase/Config';
import { useContext } from 'react';
import { db } from '../../Firebase/Config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

function DoctorViewAppointments() {
  
    const {user} = useContext(AuthContext);
    const [products,setProducts]=useState([]);
    const [errorMessage,setErrorMessage]=useState('')

    const CancelBooking= async ID=>{
      await deleteDoc(doc(db,'booking',ID));
      
      toast.success("Booking Canceled")
    }
  
    
    
     const fetch=async()=>{
     
           const collectionRef=collection(db,"booking")
           let q;
           q=query(collectionRef,where('branch','==','DERMATOLOGY'));
         
           const products=await getDocs(q)
           if (products.docs.length>0)
           {
             setErrorMessage('');
             var productArray= [];
             for (var snap of products.docs)
             {
               var data=snap.data();
               data.ID=snap.id;  
               productArray.push({...data});
               console.log('success1')
               console.log(products);
              
                 
             }
           }
            if (productArray.length ===products.docs.length)
         {   
         setProducts(productArray);  
         }
         
           else{
             setProducts([]);
             setErrorMessage('No Products Found');
         }
         
         
         }
             
         useEffect(() => {
           fetch();
         });

         
const history = useNavigate();


  
    return (
    <div>
<hr/>
{ errorMessage?<h2>eroor{errorMessage}</h2> : products.map((item)=>
  <div class="container">

    <div class="profile">
      <img src={pimg} height='100px' width='100px' alt="Profile Picture"/>
      <div>
        <p> Patient ID : {item.ID}</p>
        <h4>Patient Name :{item.displayName}</h4>
        <p>Age :{item.Age}</p>
        <p>Symptoms : {item.symptoms}</p>
       </div>
    </div>
    <div class="orders">
      <h2>Booking Details</h2>
      <ul>
        <li>
          <div>
            <p>Booked for : {item.BookingDate}</p>
            <p>Branch : {item.branch}</p>
            <p>Time that want to visit : {item.time}</p>
            <p>Email : {item.email}</p>
              <p>Phone : {item.phone}</p>
             <p>Address : {item.address}</p>
            <button type="button" onClick={()=>{CancelBooking(item.ID);}}  class="btn btn-danger btn-lg mx-3">Cancel Booking</button>          
            <button type="button"   class="btn btn-dark btn-lg" >Write Prescription</button>
          </div>
        </li>
      </ul>
    </div>
  
  </div>
)}

    </div>
  )
}

export default DoctorViewAppointments