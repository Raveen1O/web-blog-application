import React from 'react'
import {useEffect} from 'react'
import {Link, useParams} from 'react-router-dom'
import {useState} from 'react'
import {format} from 'date-fns';
import {useContext} from 'react';
import {UserContext} from './UserContext.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const BlogPage = () => {
    const {id} = useParams();
    const [postInfo,setPostInfo] = useState(null)
    const {userInfo} = useContext(UserContext) 
    useEffect(()=>{
        fetch(`http://localhost:5000/post/${id}`).then((response)=>{
            response.json().then((postInfo)=>{
                setPostInfo(postInfo);
            })
        })
    },[])
    if(!postInfo) return <div>No posts...</div>
  return (
    <div style={{maxWidth:"1000px"}}>
        <h1 style={{fontWeight:"700",textAlign:"center"}} className="fs-1 mb-5">{postInfo.title}</h1>
      <div className="d-flex justify-content-center">
      <img src={postInfo.imageUrl} className="rounded mb-4 img-fluid"></img>
      </div>
      <div className="d-flex row-start">
      <div className="text-dark me-2 mb-3">by @{postInfo.author}</div>
      {postInfo &&<time className="text-secondary">
                  {format(new Date(postInfo.createdAt),'MMM d, yyyy HH:mm')}
       </time>
        }
      </div>
      <p className="fs-3 mb-4">{postInfo.description}</p>
      { userInfo && userInfo.userName===postInfo.author &&
        <div className='d-flex justify-content-center'>
            <Link to={`/edit/${id}`}>
                <button className='btn btn-secondary mb-5' style={{width:"200px"}}>
                <FontAwesomeIcon icon="fa-solid fa-edit"/>  Edit this blog</button>
            </Link>
        </div>
        
      }
    </div>
  )
}

export default BlogPage
