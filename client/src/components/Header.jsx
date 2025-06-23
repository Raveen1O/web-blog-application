import React from 'react'
import {Link} from 'react-router-dom';
import {useState} from 'react';
import {useEffect,useContext} from 'react';
import {UserContext} from './UserContext.jsx';

const Header = () => {
  const {setUserInfo,userInfo} = useContext(UserContext)
  useEffect(()=>{
    fetch('https://ai-blog-app-fsqg.onrender.com/profile',{
      method:'GET',
      credentials:'include',
      headers: {'Content-Type': 'application/json'},
      
    }).then(response=>{
      response.json().then(userInfo=>{
        setUserInfo(userInfo);
      })
    })
    

  },[])
  function logout(event){
    console.log('hi')
    event.preventDefault();
    fetch('https://ai-blog-app-fsqg.onrender.com/logout',{
      credentials:'include',
      method:'POST',
    })

    setUserInfo(null);
  }
  const username=userInfo?.userName
  return (
    <header>
        <nav className="navbar navbar-expand-lg">
          <div className="container-fluid px-5 mx-5 d-flex justify-content-between">
            <div className="navbar-brand">
              <Link to="/">Blogweb</Link>
            </div>
            {username && (
              <>
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link to="/create" className="nav-link link-dark">Create new blog</Link>
                </li>
                <li className='nav-item' >
                  <div onClick={logout} className="nav-link link-dark">Logout</div>
                </li>
              </ul>
              </>
            )
            }

            {
              !username && (
                <>
                  <ul className="navbar-nav">
                    <li className="nav-item">
                      <Link to="/login" className="nav-link link-dark">Login</Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link link-dark">Register</Link>
                    </li>
                  </ul>
                </>
              )
            }
          </div>
        </nav>
      </header>
  )
}

export default Header
