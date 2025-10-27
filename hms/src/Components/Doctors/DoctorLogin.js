import React, { useState } from 'react';
import DoctorLogo from '../../assets/doctorimg.png'
import { getAuth } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {  useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
function DoctorLogin() {
 const [email,setEmail] =useState('');
 const [password,setPassword]=useState('');
const [branch,setBranch]=useState('');
 const auth = getAuth();
 const history =useNavigate();
 
 const handleSubmit=()=>{
  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
   
    const user = userCredential.user;
    console.log(user)
    console.log("signed in")
    // ...
  }).then(()=>{
    toast.success("Login Successful")
       
     const Drbranch=branch;
     toast.info(Drbranch)
     history('/doctor-dashboard',{state:{branch:Drbranch}})   
     
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("error")
    console.log(errorCode)
    console.log(errorMessage)
    toast.error("Verify your Email and Password")

  });

 
 
 }

 
 



  return (
    <div>
      <div className="loginParentDiv">
        <p>Doctor Login</p>
        <img width="200px" height="200px" src={DoctorLogo} alt="image" ></img>
        <form>
          
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            defaultValue="John"
            required
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            defaultValue="Doe"
            required
          />
          <br />
          <label class="formbold-form-label formbold-form-label-2">
         Your Branch 
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
          <option value="DERMATOLOGY">DERMATOLOGY</option>
          <option selected value="DERMATOLOGY">DERMATOLOGY</option>
        </select>
    
              </div>
          <br />
          
          
        </form>
        <button  onClick={()=>{handleSubmit(); }} >Login</button>
      </div>
    </div>
  );
}

export default DoctorLogin;
