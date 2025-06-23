import React from 'react'
import BlogPreview from './BlogPreview.jsx';
import {useEffect,useState,useContext} from 'react'
import { UserContext } from './UserContext.jsx';
const BlogList = () => {
  const [blogs,setBlogs]= useState([])
  const [rendered,setRendered] = useState(false);
  const {userInfo,loggedIn,appliedChanges,setLoggedIn,setAppliedChanges,deleted,setDeleted} = useContext(UserContext) 
  useEffect(()=>{
    fetch('https://ai-blog-app-fsqg.onrender.com/blog'
    ).then(response=>{
      response.json().then(posts=>{
        setBlogs(posts)
      })
    })
  },[])

  const alertPlaceholder = document.getElementById('alertPlaceholder')
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

  if(alertPlaceholder && !alertPlaceholder.hasChildNodes() && appliedChanges && !rendered){
    setRendered(true);
    appendAlert('success','Changes applied successfully')
    setTimeout(function() {
      alertPlaceholder.removeChild(alertPlaceholder.firstElementChild);
      setAppliedChanges(false);
    },2000);
  }
  else if(alertPlaceholder && !alertPlaceholder.hasChildNodes() && deleted && !rendered){
    setRendered(true);
    window.location.reload();
    appendAlert('success','Successfully deleted')
    setTimeout(function() {
      alertPlaceholder.removeChild(alertPlaceholder.firstElementChild);
      setDeleted(false);
    },2000);
  }
  else if(alertPlaceholder && !alertPlaceholder.hasChildNodes() && loggedIn && !rendered){
    setRendered(true);
    appendAlert('success',`Welcome ${userInfo.userName}`)
    setTimeout(function() {
      alertPlaceholder.removeChild(alertPlaceholder.firstElementChild);
      setLoggedIn(false);
    },2000);
  }
  
  return (
    <div>
      <div id="alertPlaceholder" className="my-2 container-fluid" style={{maxWidth:"800px"}}></div>
      {blogs.length>0 && 
        <div className="d-flex flex-column justify-content-center">
          {
            blogs.map(blog=>{
              return <BlogPreview {...blog} Key={blog._id}/>
            })
          }
        </div>
      
      }
    </div>
    
  )
}

export default BlogList
