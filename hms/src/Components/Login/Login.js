import React from 'react';
import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Config'
import { toast } from 'react-toastify';
import Logo from '../../assets/userimg.jpg'







function Login() {

    
  const [email,setEmail] =useState('');
  const [password,setPassword]=useState('');
 
  
  const history =useNavigate();
  
  const handleSubmit=(e)=>{
   signInWithEmailAndPassword(auth, email, password)
   .then((userCredential) => {
     e.preventDefault();
     const user = userCredential.user;
     console.log(user)
     console.log("signed in")
     // ...
   }).then(()=>{
     toast.success("You are signed in")
   }).then(()=>{
     history('/appointment')
   })
   .catch((error) => {
     const errorCode = error.code;
     const errorMessage = error.message;
     toast.error(errorCode)
     console.log(errorCode)
     console.log(errorMessage)
   });
 
   e.preventDefault();
 
  }
 
 





  return (
    <div>
      <div className="loginParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            defaultValue="John"
            value={email}
             onChange={(e)=>setEmail(e.target.value)}
               
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            defaultValue="Doe"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
               
          />
          <br />
          <br />
          <button onClick={handleSubmit} >Login</button>
        </form>
        <a>Signup</a>
      </div>
    </div>
  );
}

export default Login;
