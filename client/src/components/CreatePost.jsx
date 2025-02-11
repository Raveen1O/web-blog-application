import React from 'react'
import {useState} from 'react'
import {Navigate} from 'react-router-dom'
import {useContext} from 'react'
import {UserContext} from './UserContext.jsx'

const CreatePost = () => {
    const {userInfo} = useContext(UserContext)
    const userName=userInfo?.userName
  const [title,setTitle]  = useState('')
  const [summary,setSummary] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [description,setDescription] = useState('')
  const [redirect,setRedirect] = useState(false)
  async function handleSubmit(event){
    event.preventDefault()
    const response= await fetch('http://localhost:5000/create',{
        method:'POST',
        credentials:'include',
        body:JSON.stringify({title,summary,description,imageUrl,userName}),
        headers: {'Content-Type': 'application/json'},
    })

    if(response.ok){
        setRedirect(true)
    }
  }
  if(redirect){
    return <Navigate to ={'/'} />
  }
  return (
    <div className="p-2 col-sm-10">
    <h1 style={{fontWeight:"800"}} className="d-flex justify-content-center">Create New Blog</h1>
    <form action="" onSubmit={handleSubmit}>
        <div className="mb-2 mt-5 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="Title">Title</label>
        <div className="col-sm-8" >
            <input type="text" id="Title" className="form-control" value={title} onChange={(e)=>setTitle(e.target.value)} placeholder="Title"/>
        </div>
        </div>
        <div className="mb-2 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="summary">Summary</label>
        <div className="col-sm-8" >
            <input type="text" id="summary" className="form-control" value={summary} onChange={(e)=>setSummary(e.target.value)} placeholder="Summary"/>
        </div>
        </div>

        <div className="mb-2 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="description">Description</label>
        <div className="col-sm-8" >
            <textarea id="description" style={{height:"100px"}} className="form-control" value={description} onChange={(e)=>setDescription(e.target.value)}placeholder="Enter the description here"/>
        </div>
        </div>

        <div className="mb-5 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="imageUrl">Image URL</label>
        <div className="col-sm-8" >
            <input type="text" id="imageUrl" className="form-control" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="Image URL"/>
        </div>
        </div>

        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-dark col-sm-6">Create Blog</button>
        </div>
    </form>
    </div>
  )
}

export default CreatePost
