import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import './Dashboard.css'
import AdminImage from '../../assets/adminimage.webp'
import MedicationIcon from '@mui/icons-material/Medication';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import ArticleIcon from '@mui/icons-material/Article';
import GroupIcon from '@mui/icons-material/Group';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
const MyScreen = () => {

  const linearGradient = ' linear-gradient(to bottom, #f1f1f1, #f2f2f2);';

  return (
    <Container fluid>
      <Row>
        <Col md="3" className="bg-primary d-flex flex-column justify-content-center align-items-center">
          {/* First section, taking up 25% of the screen */}
          <div className="rounded-circle bg-light" style={{ width: '150px', height: '150px', overflow: 'hidden' }}>
            <img src={AdminImage} alt="Profile picture" style={{ width: '100%', height: 'auto' }} />
          </div>
          <ul className="list-unstyled mt-1.5">

            <Link to='/dashboard/add-pharmacist' >
            <li><button type="button"  class="btn btn-light btn-lg btn-block ">Add Pharmacist</button></li><br/>
            </Link>
            <Link to='/dashboard/all-pharmacist'>
            <li><button type="button"  class="btn btn-light btn-lg btn-block ">View Pharmacist</button></li><br/>
            </Link>
            <Link to='/dashboard/all-prescription'>
            <li><button type="button"  class="btn btn-light btn-lg btn-block ">All Prescription</button></li><br/>
            </Link>
            <Link to= '/dashboard/add-blood'>
            <li><button type="button"  class="btn btn-light btn-lg btn-block ">Update Blood Bank</button></li><br/>
            </Link>
            <Link to= '/dashboard/blood-bank'>
            <li><button type="button"  class="btn btn-light btn-lg btn-block ">View Blood Bank</button></li><br/>
            </Link>
          </ul>
        </Col>
        <Col md="9" className="bg-secondary"
          style={{ 
            backgroundImage: 'linear-gradient(to bottom, #007bff, #2196f3)',
            height: '75vh',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '50px'
          }}
        >
          {/* Second section, taking up 75% of the screen */}
          <div className="d-flex flex-row align-items-start" >
            <div className="mb-3 me-4">
              <div className="rectangle  shadow" style={{ width: '250px', height: '150px', borderRadius: '12px',background:'#343a40' }}>
                <i className="bi bi-person-fill text-light fs-4" style={{ lineHeight: '75px' }}></i>
                <Link to='/dashboard/all-doctor' className='no_underline' >
               <div className="fw-bold text-light mt-2 p-3 ">Doctor Record</div>
              <MedicationIcon style={{ color: '#fff',height:'75px',width:'75px',paddingLeft:'10px'}} />
              </Link>
              </div>            
            </div>
            <div className="mb-3 me-4">
              <div className="rectangle  shadow " style={{ width: '250px', height: '150px',borderRadius: '12px',background:'#343a40' }}>
                <i className="bi bi-person-fill text-light fs-4" style={{ lineHeight: '75px' }}></i>
                <Link to='/dashboard/add-doctor' className='no_underline' >
              <div className="fw-bold text-light mt-2 p-3 ">Register Doctor </div>
              <PersonAddAlt1Icon style={{ color: 'white',height:'75px',width:'75px',paddingLeft:'10px'}} />
              </Link>
              </div>
              
            </div>
            <div className="mb-3 me-4">
              <div className="rectangle shadow" style={{ width: '250px', height: '150px'  ,borderRadius: '12px',background:'#343a40'  }}>
                <i className="bi bi-person-fill text-light fs-4" style={{ lineHeight: '75px' }}></i>
                <Link to='/dashboard/all-appointment' className='no_underline' >
              <div className="fw-bold text-light mt-2 p-3">View Appointment  </div>
              <ArticleIcon style={{ color: 'white',height:'75px',width:'75px',paddingLeft:'10px'}} />
              </Link>
              
              </div>
             
            </div>
            <div className="mb-3">
              <div className="rectangle  shadow" style={{ width: '250px', height: '150px' ,borderRadius: '12px',background:'#343a40'}}>
                <i className="bi bi-person-fill text-light fs-4" style={{ lineHeight: '75px' }}></i>
                <Link to='/dashboard/all-user' className='no_underline'>
              <div className="fw-bold text-light mt-2 p-3">Users</div>
              <GroupIcon style={{ color: 'white',height:'75px',width:'75px',paddingLeft:'10px'}} />
              </Link>
             
              </div>
              
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default MyScreen;
