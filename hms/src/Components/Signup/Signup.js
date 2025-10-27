import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from '../../assets/userimg.jpg'
import './Signup.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {  collection, addDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db,auth } from '../../Firebase/Config';
export default function Signup() {

  const [username,setUsername]= useState('');
  const [email,setEmail] =useState('');
  const [phone,setPhone] =useState('');
  const [password,setPassword] = useState('')
  
  const history= useNavigate();

  const createUserFunction=(e)=>
 {
   e.preventDefault();
  createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("User created");
    console.log(user);
    const docRef =  addDoc(collection(db, "users"), {
  userId:user.uid,
  displayName: username,
  phone:phone,
  email:email,
  password:password
})
.then(()=>
  {
    toast.success("Registered")
    history('/login')
  })
console.log("Document written with ID: ", docRef.id);
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    toast.error(errorCode);
    console.log(errorMessage);
    console.log("error");
    // ..
  });



 }


  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo}></img>
        <form>
          <label htmlFor="fname">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="fname"
            name="name"
            defaultValue="John"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />
          <br />
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
          <label htmlFor="lname">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="lname"
            name="phone"
            defaultValue="Doe"
            value={phone}
            onChange={(e)=>setPhone(e.target.value)}
            
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
          <button onClick={createUserFunction} >Signup</button>
        </form>
        <a>Login</a>
      </div>
    </div>
  );
}
