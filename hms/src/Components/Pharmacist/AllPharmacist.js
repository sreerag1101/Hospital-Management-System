import React from 'react'
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc } from 'firebase/firestore';
import { Col, Container, Row } from 'reactstrap';

const AllPharmacist=()=> 
{
    
  const {data:productData,loading} =useGetdata('pharmacist')
  const deletePharmacist= async id=>{
    await deleteDoc(doc(db,'pharmacist',id));

  }
    
  return (
     <section>
      <Container>
        <Row>
          <Col lg='12'>
        
    <table className='table'>
      <thead>
       
       <th>Name</th>
       <th>Joining Date</th>
       <th>Mobile</th>
       <th>Email</th>
       <th>Password</th>
       <th>Action</th>
      </thead>
      <tbody>
      {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
        <tr key={item.id}>
                   
           <td><h3>{item.name}</h3></td>
           <td>{item.addedAt}</td>
           
           <td>{item.mobile}</td>
           <td>{item.email}</td>
           <td>{item.password}</td>          
           <td><button className='btn btn-danger' onClick={()=>{deletePharmacist(item.id);}}>
            Delete</button></td>
  
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


export default AllPharmacist