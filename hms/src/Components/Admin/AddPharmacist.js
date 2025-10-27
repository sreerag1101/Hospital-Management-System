import React, { createContext, Fragment, useContext, useState } from 'react';
import Header from '../Header/Header';
import { FirebaseContext,AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from 'firebase/storage';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../Firebase/Config';
import { getDoc,collection,addDoc } from 'firebase/firestore';
import {db} from '../../Firebase/Config'
import './AddDoctor.css'
import { toast } from 'react-toastify';

const  AddPharmacist= (e) => {
 
 
 const {user}=useContext(AuthContext)
 const [name,setName]=useState('');
 const [image,setImage]=useState(null);
 const [mobile,setMobile] = useState('');
 const [password,setPassword] = useState('')
 const [email,setEmail] =useState('');
 
const handleSubmit=(e)=>
{
  e.preventDefault();
 createUserWithEmailAndPassword(auth, email, password)
 .then((userCredential) => {
   // Signed in 
   const user = userCredential.user;
   console.log("User created");
   console.log(user);
   const date=new Date()
   const docRef =  addDoc(collection(db, "pharmacist"), {
    name,
    mobile,
    id:user.uid,    
    email,
    password,
    addedAt :date.toDateString() 
  })
.then(()=>
 {
   toast.success("Registered")
  
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
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Pharmacist Name</label>
            <br />
            <input
              className="input" 
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <br />
            
            <label htmlFor="fname">Mobile</label>
            <br />
            <input className="input"
             type="number"
              id="fname"
               name="Price"
               value={mobile}
               onChange={(e)=>setMobile(e.target.value)}
               />
               <br/>
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
          <label htmlFor="fname">Password</label>
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
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
      
        </div>
      </card>
    </Fragment>
  );
};

export default AddPharmacist;
