import React from 'react'
import { NavLink } from 'react-router-dom'
import { Row,col,Container } from 'reactstrap'
import VcLogo from '../../assets/VcLogo.png'
const admin_nav=[
  {
  display:'Dashboard',
  path:'/dashboard'
  },
  {
    display:'all-products',
    path:'/dashboard/all-products'
    },
    {
      display:'All-seller',
      path:'/dashboard/all-seller'
    },
      {
        display:'Add-product',
        path:'/dashboard/add-products'
        },
        {
          display:'All-Buyers',
          path:'/dashboard/buyers'
          },
          {
            display:'Orders',
            path:'/dashboard/orders'
            },
            {
              display:'Add Seller',
              path:'/dashboard/add-seller'
              },
              ,
            {
              display:'All Services',
              path:'/dashboard/all-services'
              },
    
  

]



const AdminNav=()=> {
  return <header className='admin_header'>
      <div className='admin_nav-top'>
        <Container>
          <div className='admin_nav-wrapper-top'>
            <div className='logo'>
              <h2>Virtual City</h2>
            </div>
          <div className='searchbox'>
            <input type="text" placeholder='search.....'/>
            
            <span><i class='ri-search-line'></i></span>
          </div>
          <div className='admin_nav-top-right'>
             <span><i class='ri-notification-3-line'></i></span>
             <span><i class='ri-settings-2-line'></i></span>
             <img src={VcLogo} alt='image of admin'/>

          </div>
          
          </div>

        </Container>
       <section className='admin_menu' >
        <Container>
          <Row>
         <div className='admin_navigation'>
           <ul className='admin_menu_list'>
            {
            admin_nav.map((item,index)=>(
              <li className='admin_menu_item' key={index}>
              <NavLink to={item.path}>{item.display}</NavLink>
              </li>
            ))
            }
            </ul>

         </div>
          


</Row>



        </Container>

       </section>

     </div>
 
  </header>
  
};

export default AdminNav