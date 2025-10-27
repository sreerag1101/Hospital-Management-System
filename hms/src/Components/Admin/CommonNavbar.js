import React from 'react'
import { Navbar, NavbarBrand, Nav, NavItem, NavLink, Button } from 'reactstrap';
import { AuthContext } from '../../store/Context';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../Firebase/Config';
function CommonNavbar() {

    const history = useNavigate();

    const handleButtonClick = () => {
        if(user)
        {
         auth.signOut();
         history('/')
         toast.info("signed out")
         
        }
    }

 const {user} = useContext(AuthContext);

  return (
     <div>
 <Navbar color="dark" dark expand="md">
      <NavbarBrand href="/">My Website</NavbarBrand>
      <Nav className="ml-auto" navbar>
        <NavItem>
        <p href='/home' style={{color:'white',fontFamily:'-moz-initial',paddingTop:'8px' ,paddingRight:'6px' }} >Home</p>
        </NavItem>
        <NavItem>
          <p style={{color:'white',fontFamily:'-moz-initial',paddingTop:'8px' ,paddingRight:'6px' }} >{user?user.email:'Login'}</p>
        </NavItem>
        <NavItem>
          <Button class='btn btn-dark text-decoration-none light' onClick={handleButtonClick}>Log Out</Button>
        </NavItem>
      </Nav>
    </Navbar>









     </div>
  )
}

export default CommonNavbar