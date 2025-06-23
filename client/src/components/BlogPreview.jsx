import React from 'react'
import {Link} from 'react-router-dom'
import {format} from 'date-fns'
import {useContext,useState} from 'react';
import {Navigate} from 'react-router-dom'
import {UserContext} from './UserContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const BlogPreview = ({title,summary,description,imageUrl,createdAt,author,_id}) => {
  const {userInfo,setDeleted,deleted} = useContext(UserContext);
  async function handleDelete(){
    await fetch(`https://ai-blog-app-fsqg.onrender.com/delete/${_id}
`);
    setDeleted(true);
  }
  
  return (
    <div>
      <div className="card my-3 container-fluid" style={{maxWidth:"800px"}}>
            <img className="card-img-top" style={{maxHeight:"430px"}} src={imageUrl}></img>
            <div className="card-body">
              <h5 className="card-title">{title}</h5>
              <div className="card-subtitle d-flex justify-content-start" style={{fontSize:"15px", fontWeight:"500"}}>
                <p className="author me-2">
                  {author}
                </p>
                <time className="text-secondary">
                  {format(new Date(createdAt),'MMM d, yyyy HH:mm')}
                </time>
              </div>
              <p className="card-text">{summary}</p>
              <div className="d-flex justify-content-between">
                <Link to={`/post/${_id}`} className="btn btn-dark">Read Blog</Link>
                {userInfo && userInfo.userName===author && <button className="btn btn-danger" onClick={handleDelete}><FontAwesomeIcon icon="fa-solid fa-trash"/> Delete Blog</button> }
              </div>
            </div>
          </div>
    </div>
  )
}

export default BlogPreview
