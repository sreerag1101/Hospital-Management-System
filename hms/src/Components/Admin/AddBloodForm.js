import React from 'react'
import {useState } from 'react';
import { db } from '../../Firebase/Config';
import { collection,addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
function AddBloodForm() {


 const history = useNavigate();
 
  const [donorName,setDonorName]=useState('');
  const [donorPhone,setDonorPhone]=useState('');
  const [bloodGroup,setBloodGroup] = useState('');
  const [expiryDate,setExpiryDate] =useState('');
  const [collectionDate,setCollectionDate]=useState('');


 const  addToBloodbank =()=>{
  const docRef =  addDoc(collection(db, "bloodBank"), {
    
   donorName:donorName,
   donorPhone:donorPhone,
   bloodGroup:bloodGroup,
   expiryDate:expiryDate,
   collectionDate:collectionDate
   
  })
  .then(()=>
    {
      toast.success("Added to Blood Bank")
      history('/dashboard')
      
    }).catch((error)=>{
   const  show= error.errorMessage;
     toast.error(show)
    })
  
 }  



  return (
    <div className='All'>


<div class="formbold-main-wrapper">
  <div class="formbold-form-wrapper">
    <form >
      <div>
        
      </div>
      <div class="formbold-mb-5">
        <label for="name" class="formbold-form-label"> Donor Name </label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Donor Name"
          class="formbold-form-input"
          
          value={donorName}
          onChange={(e) =>
            setDonorName(e.target.value)
          }
        />
      </div>
      <div class="formbold-mb-5">
        <label for="email" class="formbold-form-label"> Donor Phone </label>
        <input
          type="number"
          name="medicine"
          id="email"
          placeholder="phone"
          class="formbold-form-input"
          
          value={donorPhone}
          onChange={(e) =>
            setDonorPhone(e.target.value)
          }
        />
      </div>
      <div class="formbold-mb-5">
        <label for="email" class="formbold-form-label"> Blood Group </label>
        <input
          type="text"
          name="medicine"
          id="email"
          placeholder="O+,AB+,A+,B+..."
          class="formbold-form-input"
          
          value={bloodGroup}
          onChange={(e) =>
            setBloodGroup(e.target.value)
          }
        />
      </div>

      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Collected Date
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-full formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="date"
                name="area"
                id="area"
                placeholder="date"
                class="formbold-form-input"
                value={collectionDate}
                onChange={(e) =>
                  setCollectionDate(e.target.value)
                }
              />
            </div>
          </div>
        
        </div>
      </div>
      <div class="formbold-mb-5 formbold-pt-3">
        <label class="formbold-form-label formbold-form-label-2">
          Expiry Date
        </label>
        <div class="flex flex-wrap formbold--mx-3">
          <div class="w-full sm:w-full formbold-px-3">
            <div class="formbold-mb-5">
              <input
                type="date"
                name="area"
                id="area"
                placeholder="date"
                class="formbold-form-input"
                value={expiryDate}
                onChange={(e) =>
                  setExpiryDate(e.target.value)
                }
              />
            </div>
          </div>
        
        </div>
      </div>




      <div>
        
      </div>
    </form>
    <button onClick={addToBloodbank} class="formbold-btn"   >Add To Blood Bank</button>
  </div>
</div>

    </div>
  )
}

export default AddBloodForm