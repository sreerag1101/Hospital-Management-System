import React from 'react'
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc } from 'firebase/firestore';
import { Col, Container, Row } from 'reactstrap';

const AllAppointments=()=> 
{
    
  const {data:productData,loading} =useGetdata('booking')
  const deleteAppointment= async id=>{
    await deleteDoc(doc(db,'booking',id));

  }
    
  return (
     <section>
      <Container>
        <Row>
          <Col lg='12'>
        
    <table className='table'>
      <thead>
       <th>Patient Name</th>
       <th>Booked For</th>
       <th>branch</th>
       <th>Symptoms</th>
       <th>Mobile</th>
       <th>Email</th>
       <th>Address</th>
       <th>Booked for time</th>
       <th>Action</th>

      </thead>
      <tbody>
      {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
        <tr key={item.id}>  
           <td>{item.displayName}</td>
           <td>{item.BookingDate}</td>
           <td>{item.branch}</td>
           <td>{item.symptoms}</td>
           <td>{item.phone}</td>
           <td>{item.email}</td>
           <td>{item.address}</td>
           <td>{item.time}</td>
           <td><button className='btn btn-danger' onClick={()=>{deleteAppointment(item.id);}}>
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


export default AllAppointments
