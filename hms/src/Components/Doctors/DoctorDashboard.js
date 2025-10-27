import React, { useContext,useState,useEffect } from 'react';
import BGDoctor from '../../assets/doctorbg.jpg'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Context';
import DoctorViewAppointments from '../Appointments/DoctorViewAppointments';
import './DoctorDashboard.css'
import { db } from '../../Firebase/Config';
import { collection,where,query,getDocs,doc,deleteDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import pimg from '../../assets/p1.webp'
import { useLocation } from 'react-router-dom';
function DoctorDashboard() {


  const location=useLocation();
 
  const selectedBranch=location.state.branch;



  const {user} =useContext(AuthContext);
  const backgroundImageUrl = `url(${BGDoctor})`;
  const history = useNavigate();
  const [currentComponent, setCurrentComponent] = useState(null);
  const [products,setProducts]=useState([]);
    const [errorMessage,setErrorMessage]=useState('')

    const CancelBooking= async ID=>{
      await deleteDoc(doc(db,'booking',ID));
      
      toast.success("Booking Canceled")
    }
  
    
    
     const fetch=async()=>{
     
           const collectionRef=collection(db,"booking")
           let q;
           q=query(collectionRef,where('branch','==',selectedBranch));
         
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

         

         const PassInfoToPrescription =(displayName,Age,email)=>
     
         {
            const pName=displayName;
           const  pAge=Age;
           const   pEmail=email;
         
             history('/doctor-prescription',{state:{Name:pName,Age:pAge,Email:pEmail}})   
             toast.info(pName,pAge,pEmail)
               
         }
         

  

  return (
    <div>
    <div style={{ backgroundImage: backgroundImageUrl, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <p>Welcome</p>
        <p>{user?user.email:<p>Doctor</p>}</p>
      </div>
     
    </div>
    
<p>{selectedBranch}</p>

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
            <button type="button" onClick={()=>{PassInfoToPrescription(item.displayName,item.Age,item.email) }}  class="btn btn-dark btn-lg" >Write Prescription</button>
          </div>
        </li>
      </ul>
    </div>
  
  </div>
)}

    </div>
  
    </div>
  );
}

export default DoctorDashboard;
