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

const AddDoctor = (e) => {
 
 const {firebase}=useContext(FirebaseContext)
 const {user}=useContext(AuthContext)
 const [name,setName]=useState('');
 const [branch,setBranch]=useState('');
 const [address,setAddress]=useState('');
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
  const storage = getStorage();
  const storageRef =ref(storage, `/image${image.name}`);

  uploadBytes(storageRef, image).then((snapshot) => {
    console.log('Uploaded a blob or file!');
    // Get the download URL
  });

  const path= getDownloadURL(storageRef).then((url) => {
      
    const hi=url;
    console.log(hi);
   const docRef =  addDoc(collection(db, "doctors"), {
    name,
    branch,
    address,
    mobile,
    id:user.uid,
    url,
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

});

}











  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
        
            <label htmlFor="fname">Doctor Name</label>
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
            
            <label htmlFor="fname">Address</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={address}
              onChange={(e)=>setAddress(e.target.value)}
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
            <label htmlFor="fname">Department</label>
            <br />
            <br/>
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
    
            <br />
    
          <br />
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
        
            <br />
            <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <button className="uploadBtn" onClick={handleSubmit}>upload and Submit</button>
      
        </div>
      </card>
    </Fragment>
  );
};

export default AddDoctor;
