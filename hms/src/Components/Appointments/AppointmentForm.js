import React, { useContext } from 'react'
import './AppointmentForm.css'
import { useEffect,useState } from 'react';
import { db } from '../../Firebase/Config';
import { collection,query,where,getDocs,addDoc } from 'firebase/firestore';
import { AuthContext } from '../../store/Context';
import { toast } from 'react-toastify';

function AppointmentForm() {

  const [patientName,setPatientName]= useState('');
  const [Pphone,setPphone] =useState('');
  const [branch,setBranch]=useState('');
  const [symtptoms,setSymptoms]=useState('');
  const [address,setAddrress]=useState('');
  const [bdate,setBdate] = useState('');
  const [time,setTime]= useState('');
  const [age,setAge] = useState('');

  const date=new Date();

 const  addToBooking =()=>{
  const docRef =  addDoc(collection(db, "booking"), {
    patientId:user.uid,
    displayName: patientName,
    phone:Pphone,
    email:user.email,
    branch:branch,
    symptoms:symtptoms,
    address:address,
    BookingDate:bdate,
    time:time,
    Age:age,
    BookedOn :date.toDateString()
  })
  .then(()=>
    {
      toast.success("Registered")
      
    }).catch((error)=>{
   const  show= error.errorMessage;
     toast.error(show)
    })
  
 }  

  const {user}=useContext(AuthContext)
  const [products,setProducts]=useState([]);
  const [errorMessage,setErrorMessage]=useState('')
  
   const fetch=async()=>{
   
         const collectionRef=collection(db,"users")
         let q;
         q=query(collectionRef,where('email','==',user.email));
       
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
       }, []);
       
      
      
  
  return (
    <div className='All'>


<div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form >
      <div class="formbold-mb-5">
        <label for="name" class="formbold-form-label"> Patient Name </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Full Name"
          class="formbold-form-input"
          
          value={patientName}
          onChange={(e) =>
            setPatientName(e.target.value)
          }
        />
        
      </div>
      <div class="formbold-mb-5">
        <label for="phone" class="formbold-form-label"> Age </label>
        <input
          type="number"
          name="number"
          id="phone"
          placeholder="Enter your phone number"
          class="formbold-form-input"
          
          value={age}
          onChange={(e) =>
            setAge(e.target.value)
          }
        />
      </div>

      <div class="formbold-mb-5">
        <label for="phone" class="formbold-form-label"> Phone Number </label>
        <input
          type="text"
          name="phone"
          id="phone"
          placeholder="Enter your phone number"
          class="formbold-form-input"
          
          value={Pphone}
          onChange={(e) =>
            setPphone(e.target.value)
          }
        />
      </div>
      <div class="formbold-mb-5">
        <label for="email" class="formbold-form-label"> Email </label>
        <input
          type="email"
          name="email"
          id="email"
          value={user.email}
          class="formbold-form-input"       
        />
      </div>
      <div class="flex flex-wrap formbold--mx-3">
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5 w-full">
            <label for="date" class="formbold-form-label"> Date </label>
            <input
              type="date"
              name="date"
              id="date"
              class="formbold-form-input"
              value={bdate}
              onChange={(e) =>
                setBdate(e.target.value)
              }
            />
          </div>
        </div>
        <div class="w-full sm:w-half formbold-px-3">
          <div class="formbold-mb-5">
            <label for="time" class="formbold-form-label"> Time </label>
            <input
              type="time"
              name="time"
              id="time"
              class="formbold-form-input"
              value={time}
              onChange={(e) =>
              setTime(e.target.value)
            }
            />
          </div>
        </div>
      </div>

      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Address Details
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-full formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="area"
                id="area"
                placeholder="Enter area,district,...etc"
                class="formbold-form-input"
                value={address}
                onChange={(e) =>
                  setAddrress(e.target.value)
                }
              />
            </div>
          </div>
        
        </div>
      </div>


      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Symptoms
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-full formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="text"
                name="area"
                id="area"
                placeholder="Enter symtptoms that you are facing"
                class="formbold-form-input"
                value={symtptoms}
                onChange={(e) =>
                  setSymptoms(e.target.value)
                }
              />
            </div>
          </div>
        
        </div>
      </div>


      <div class="formbold-input-radio-wrapper">
            
      <label class="formbold-form-label formbold-form-label-2">
          Branch you want to consult
        </label>
       
            <div class="formbold-radio-flex">
    
        <select className='select__options'
         required
          value={branch} 
        
          onChange={(e) =>
            setBranch(e.target.value)} >
          <option value="OSTEOLOGY">OSTEOLOGY</option>
          <option value=" NEUROLOGY"> NEUROLOGY</option>
          <option value="CARDIOLOGY">CARDIOLOGY</option>
          <option value="ENT">ENT</option>
          <option value="GENERAL">GENERAL</option>

          <option selected value="DERMATOLOGY">DERMATOLOGY</option>
        </select>
    
              </div>
              </div>



      <div>
        
      </div>
    </form>
    <button onClick={addToBooking} class="formbold-btn"   >Book Appointment</button>
  </div>
</div>

    </div>
  )
}

export default AppointmentForm