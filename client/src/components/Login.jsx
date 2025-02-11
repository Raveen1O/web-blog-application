import React from 'react'
import {useState,useContext} from 'react';
import {Navigate} from 'react-router-dom';
import {UserContext} from './UserContext.jsx'

const Login = () => {
  const [userName,setUsername]=useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);
  const {setUserInfo,setLoggedIn} = useContext(UserContext)

  async function handleSubmit(e) {
    e.preventDefault();
    const response= await fetch('http://localhost:5000/login', {
      method:'POST',
      body:JSON.stringify({userName,password}),
      headers: {'Content-Type': 'application/json'},
      credentials:'include',
    })
    if(response.ok){
      response.json().then(userInfo=>{
        setUserInfo(userInfo)
        setLoggedIn(true);
        setRedirect(true);
      })
    }
    else{
      const alertPlaceholder = document.getElementById('alertPlaceholder')
      if(alertPlaceholder.hasChildNodes()){
        return ;
      }
      const appendAlert = (type,message) => {
        const wrapper = document.createElement('div')
        wrapper.innerHTML = [
          `<div class="alert alert-${type} alert-dismissible" role="alert">`,
          `   <div>${message}.</div>`,
          '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
          '</div>'
        ].join('')
  
        alertPlaceholder.append(wrapper)
      }

      appendAlert('danger','Wrong credentials');

      setTimeout(function() {
        alertPlaceholder.removeChild(alertPlaceholder.firstElementChild);
      },2000);
    }
  }

  if(redirect){
    return <Navigate to={'/'} />
  }
  return (
    
    <div className="col-sm-10 p-5">
      <div id="alertPlaceholder"></div>
      <h1 style={{fontWeight:"800"}} className="d-flex justify-content-center">Login</h1>
      <form action="" onSubmit={handleSubmit}>
      <div className="mb-2 mt-5 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="userName">Username</label>
        <div className="col-sm-8" >
          <input type="text" id="userName" className="form-control" value={userName} onChange={(e)=>setUsername(e.target.value)}placeholder="username"/>
        </div>
      </div>
      <div className="mb-5 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="password">Password</label>
        <div className="col-sm-8" >
          <input type="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} className="form-control" placeholder="password"/>
        </div>
      </div>
      <div className="d-flex justify-content-center">
      <button type="submit" className="btn btn-dark col-sm-6" >Login</button>
      </div>
    </form>
    </div>
  )
}

export default Login
