import React, { useContext } from 'react'
import { useEffect,useState } from 'react';
import { db } from '../../Firebase/Config';
import { collection,query,where,getDocs,addDoc } from 'firebase/firestore';
import { AuthContext } from '../../store/Context';
import { toast } from 'react-toastify';
import { useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
function DoctorPrescription() {


 const history = useNavigate();
 
  const [disease,setDisease]=useState('');
  const [medicine,setMedicine]=useState('');
  const [nextDate,setNextDate] = useState('');

  const date=new Date();

 const  addToPrescription =()=>{
  const docRef =  addDoc(collection(db, "Prescription"), {
    
   disease:disease,
   medicine:medicine,
   nextDateForVisit:nextDate,
   patientName: patientName,
   patientAge:patientAge,
   patientEmail:patientEmail,
    WritedOn :date.toDateString()
  })
  .then(()=>
    {
      toast.success("Prescription Uploaded")
      history('/doctor-dashboard')
      
    }).catch((error)=>{
   const  show= error.errorMessage;
     toast.error(show)
    })
  
 }  



 const location=useLocation();
 
  const patientName=location.state.Name;
  const patientAge=location.state.Age;
  const patientEmail=location.state.Email;


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
      <div>
         <p hidden>{patientEmail}</p>
         <label for="name" class="formbold-form-label"> Name :{patientName}  Age : {patientAge} </label>
       
      </div>
      <div class="formbold-mb-5">
        <label for="name" class="formbold-form-label"> Disease </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Disease"
          class="formbold-form-input"
          
          value={disease}
          onChange={(e) =>
            setDisease(e.target.value)
          }
        />
      </div>
      <div class="formbold-mb-5">
        <label for="email" class="formbold-form-label"> Medcine </label>
        <input
          type="text"
          name="medicine"
          id="email"
          placeholder="Medicine"
          class="formbold-form-input"
          
          value={medicine}
          onChange={(e) =>
            setMedicine(e.target.value)
          }
        />
      </div>


      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Next Day for visit
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-full formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="date"
                name="area"
                id="area"
                placeholder="Enter symtptoms that you are facing"
                class="formbold-form-input"
                value={nextDate}
                onChange={(e) =>
                  setNextDate(e.target.value)
                }
              />
            </div>
          </div>
        
        </div>
      </div>




      <div>
        
      </div>
    </form>
    <button onClick={addToPrescription} class="formbold-btn"   >Add Prescription</button>
  </div>
</div>

    </div>
  )
}

export default DoctorPrescription