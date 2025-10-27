import React from 'react'
import useGetdata from '../Admin/useGetdata'
import { db } from '../../Firebase/Config'
import { doc,deleteDoc } from 'firebase/firestore';
import { Col, Container, Row } from 'reactstrap';

const AllDoctor=()=> 
{
    
  const {data:productData,loading} =useGetdata('doctors')
  const deleteDoctor= async id=>{
    await deleteDoc(doc(db,'doctors',id));

  }
    
  return (
     <section>
      <Container>
        <Row>
          <Col lg='12'>
        
    <table className='table'>
      <thead>
       <th>Image</th>
       <th>Name</th>
       <th>Joining Date</th>
       <th>branch</th>
       <th>Mobile</th>
       <th>Email</th>
       <th>Password</th>
       <th>Address</th>
       <th>Action</th>

      </thead>
      <tbody>
      {
      loading?<h3 className='py-5 text-center fw-bold'>loading...</h3>:  productData.map(item=>(
        <tr key={item.id}>
                   
           <td>
            <div >
            <img class="rounded-circle bg-light" height='200px'width='200px' src={item.url} alt="no available image"  />
            </div>
            </td>
           <td><h3>{item.name}</h3></td>
           <td>{item.addedAt}</td>
           <td>{item.branch}</td>
           <td>{item.mobile}</td>
           <td>{item.email}</td>
           <td>{item.password}</td>
           <td>{item.address}</td>
           
           <td><button className='btn btn-danger' onClick={()=>{deleteDoctor(item.id);}}>
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


export default AllDoctor