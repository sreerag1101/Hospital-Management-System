import React from 'react'
import { useState } from 'react';
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc,updateDoc } from 'firebase/firestore';
import { Col, Container, Row } from 'reactstrap';
import { toast } from 'react-toastify';
import { Padding } from '@mui/icons-material';





const BloodBankView=()=> 
{
    
  const {data:productData,loading} =useGetdata('bloodBank')
  const deleteUsers= async id=>{
    await deleteDoc(doc(db,'bloodBank',id));

   
}
const [dname,setdname] = useState('');
const [dphone,setphone] = useState('');
const [bgroup,setbgroup]=useState('');
const [cDate,setCdate]=useState('');
const [eDate,setEDate]=useState('');
  const updateField = ( ID) => {
   
    const docRef = doc(db, "bloodBank", ID);

const data = {
    donorName: dname,
    donorPhone:dphone,
    bloodGroup:bgroup,
    collectionDate:cDate,
    expiryDate:eDate

};

updateDoc(docRef, data)
.then(docRef => {
    toast.success("A New Document Field has been added to an existing document");
})
.catch(error => {
    toast.error(error);
})
    
  }
  const [showDiv, setShowDiv] = useState(true);

const handleClick=()=> {
  setShowDiv(false);
}

  

  
  return (
     <section>
      <Container>
        <Row>
          <Col lg='12'>
        
    <table className='table'>
      <thead>
       <th>Donor Name</th>
       <th>Mobile</th>
       <th>Blood Group</th>
       <th>Collected Date</th>
       <th>Expiry Date</th>

      </thead>
      <tbody>
      {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
        <tr key={item.id}>
           <td>{item.donorName}</td>
           <td>{item.donorPhone}</td>
          <td>{item.bloodGroup}</td>
           <td>{item.collectionDate}</td>
           <td>{item.expiryDate}</td>
          <td>
            {
            !showDiv && (
            <div style={{alignItems:'end',paddingRight:'2px' }}>
            <input  type='text' value={dname}placeholder='donor name' onChange={(e) =>
              setdname(e.target.value)} />
   
            <input type='text' value={dphone}placeholder='donor phone' onChange={(e) =>
              setphone(e.target.value)} />

               <input type='text' value={bgroup}placeholder='Blood Group' onChange={(e) =>
              setbgroup(e.target.value)} />

               <input type='date' value={cDate}placeholder='Collection date' onChange={(e) =>
              setCdate(e.target.value)} />
             
             <input type='date' value={eDate}placeholder='Expiry date' onChange={(e) =>
              setEDate(e.target.value)} />
             
             <button className='btn btn-sm btn-primary' onClick={()=>{updateField(item.id);}}>
            Update Fields</button>
             </div>
           
           )}

          </td>
           
           <td><button className='btn btn-danger' onClick={()=>{deleteUsers(item.id);}}>
          Delete</button></td>
          <td><button className='btn btn-secondary' onClick={handleClick}>
            Edit Field</button></td>
    
      </tr>

     ))
      }
      </tbody>
    </table>
    </Col>
    </Row>
      </Container>
     </section>

    
  )

  }


export default  BloodBankView