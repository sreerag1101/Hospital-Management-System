import React from 'react'
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc } from 'firebase/firestore';
import { Col, Container, Row } from 'reactstrap';

const AllPrescription=()=> 
{
    
  const {data:productData,loading} =useGetdata('Prescription')
  const deletePresciption= async id=>{
    await deleteDoc(doc(db,'Prescription',id));

  }
    
  return (
     <section>
      <Container>
        <Row>
          <Col lg='12'>
        
    <table className='table'>
      <thead>

       <th>Patient Name</th>
       <th>Age</th>
       <th>Disease</th>
       <th>Medicine</th>
       <th>Mobile</th>
       <th>Email</th>
      <th>Consulted On</th>
       <th>Action</th>

      </thead>
      <tbody>
      {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
        <tr key={item.id}>
                   
           
           <td><h3>{item.patientName}</h3></td>
           <td>{item.patientAge}</td>
           <td>{item.disease}</td>
           <td>{item.medicine}</td>
           <td>{item.mobile}</td>
           <td>{item.patientEmail}</td>
          <td>{item.WritedOn}</td>
           
           <td><button className='btn btn-danger' onClick={()=>{deletePresciption(item.id);}}>
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


export default AllPrescription