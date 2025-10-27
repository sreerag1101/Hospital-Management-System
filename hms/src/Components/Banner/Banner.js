import React, { useContext } from 'react';
import BG from '../../assets/hpbackground2.png'
import './Banner.css'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../store/Context';
function Banner() {

  const {user} =useContext(AuthContext);
  const backgroundImageUrl = `url(${BG})`;
  const history = useNavigate();

const signup = ()=>{
  history('/signup')
}
const login = ()=>{
  history('/login')
} 

  return (
    <div style={{ backgroundImage: backgroundImageUrl, backgroundSize: 'cover', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{textAlign:'center',fontFamily:'inherit'}}>Welcome</h2>
        <p style={{textAlign:'center',fontFamily:'-moz-initial bold '}} >{user?user.email:''}</p>
        <button  type="button" onClick={login}  class="btn btn-dark btn-lg" > Login </button>
        <br/>
        <button  type="button" onClick={signup} class="btn btn-dark btn-lg" >Sign up</button>
      </div>
    </div>
  );
}

export default Banner;
