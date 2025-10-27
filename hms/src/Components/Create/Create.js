import React, { Fragment } from 'react';
import './Create.css';
import { useState,useContext } from 'react';
import Header from '../Header/Header';
import {AuthContext } from '../../store/Context';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { getDownloadURL } from 'firebase/storage';
import { collection,addDoc } from 'firebase/firestore';
import {db} from '../../Firebase/Config'
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';




const Create = () => {

  const {user}=useContext(AuthContext)
  const [productName,setProductName]=useState('');
  const [category,SetCategory]=useState('');
  const [price,setPrice]=useState('');
  const [image,setImage]=useState(null);
  const [info,setInfo]=useState('')
  const history=useNavigate();
 
  const handleSubmit=()=>{
   
  const date=new Date()
   const storage = getStorage();
   const storageRef =ref(storage, `/image${image.name}`);
   
   uploadBytes(storageRef, image).then((snapshot) => {
     console.log('Uploaded a blob or file!');
     // Get the download URL
   });
     const path= getDownloadURL(storageRef).then((url) => {
       
       const pathurl=url;
       console.log(pathurl);
       const docRef =  addDoc(collection(db, "product"),
       
       {
         
         productName,
         category,
         price,
         info,
         userEmail:user.email,
         url:pathurl,
         id:user.uid,
         createdAt :date.toDateString() 
       
       })
       .then(()=>{
        toast.success("Uploaded Success")
        history('/home')
     
       }).catch((error)=>{
         const message=error.code;
   
         toast.error(message)
       });
     
 
   });
   
 
 }
  
 



  return (
    <Fragment>
      <Header />
      <card>
        <div className="centerDiv">
          <form onSubmit={handleSubmit} >
            <label htmlFor="fname">Name</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={productName}
              onChange={(e)=>setProductName(e.target.value)}
 

            />
            <br />
            <label htmlFor="fname">Category</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="category"
              defaultValue="John"
              value={category}
               onChange={(e)=>SetCategory(e.target.value)}
               
            />
            <br />
            

            <label htmlFor="fname">Description</label>
            <br />
            <input
              className="input"
              type="text"
              id="fname"
              name="Name"
              defaultValue="John"
              value={info}
              onChange={(e)=>setInfo(e.target.value)}
            />
            <br />

            <label htmlFor="fname">Price</label>
            <br />
            <input className="input" type="number" id="fname" name="Price"
            value={price}
            onChange={(e)=>setPrice(e.target.value)}
            
            
            />
            <br />
          </form>
          <br />
          <p>{user?user.email:'asd'}</p>
          <img alt="Posts" width="200px" height="200px" src={image?URL.createObjectURL(image):''}></img>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])} />
            <br />
            <br />
            <button className="uploadBtn" onClick={handleSubmit} >upload and Submit</button>
      
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
