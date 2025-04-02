import React from 'react'
import {useState} from 'react'

const Register = () => {
  const [userName,setUsername]=useState('')
  const [password,setPassword]=useState('')
 
  async function handleSubmit(event)  {
    event.preventDefault();
    const response=await fetch(
      'http://localhost:5000/register',{
        method: 'POST',
        body: JSON.stringify({userName,password}),
        headers: {'Content-Type': 'application/json'},
      }
    );
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
    
    if(response.ok===false){
      appendAlert('danger','Registration failed. Please try again');
    }
    else{
      appendAlert('success','Registration successful');
    }
    
    setTimeout(function() {
      alertPlaceholder.removeChild(alertPlaceholder.firstElementChild);
    },2000);
}

  return (
    <>
    <div className="p-2 col-sm-10">
    <div id="alertPlaceholder"></div>
      <h1 style={{fontWeight:"800"}} className="d-flex justify-content-center">Register</h1>
      <form action="" onSubmit={handleSubmit}>
      <div className="mb-2 mt-5 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="userName">Username</label>
        <div className="col-sm-8" >
          <input type="text" id="userName" className="form-control" onChange={(ev)=>setUsername(ev.target.value)} placeholder="username"/>
        </div>
      </div>
      <div className="mb-5 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="password">Password</label>
        <div className="col-sm-8" >
          <input type="password" id="password" className="form-control" onChange={(ev)=>setPassword(ev.target.value)} placeholder="password"/>
        </div>
      </div>
      <div className="d-flex justify-content-center">
      <button type="submit" className="btn btn-dark col-sm-6">Register</button>
      </div>
    </form>
    </div>
    </>
  )
}

export default Register
