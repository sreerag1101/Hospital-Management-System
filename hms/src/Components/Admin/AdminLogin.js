import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AdminLogo from '../../assets/adminimage.webp'

function AdminLogin() {

    const [emails,setEmails]=useState('')
    const [password,setPassword]=useState('')
    const history=useNavigate()
  
const checkAdmin = (e)=>{
  
  if(emails =='admin@gmail.com'&& password =='admin@123' )
  {
    history('/dashboard')
           
  }
  else{
    return 'null'
  }
  
}


    return (
    <div>
      <div className='loginParentDiv'>
      <img width="200px" height="200px" src={AdminLogo}></img>
        <form>
       
          <label htmlFor="fname">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="fname"
            name="email"
            value={emails}
            onChange={(e)=>setEmails(e.target.value)}
        
          />
          <br />
          <label htmlFor="lname">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="lname"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}        
          />
          <br />
          <br />
          <button onClick={checkAdmin} >Login</button>
          
        </form>





        </div>


    </div>
  )
}

export default AdminLogin