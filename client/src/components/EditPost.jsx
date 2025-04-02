import React from 'react'
import {useParams} from 'react-router-dom';
import {useState,useEffect,useContext} from 'react'
import {Navigate} from 'react-router-dom'
import {UserContext} from './UserContext.jsx'

const EditPost = () => {
  const {id} = useParams();
  const {setAppliedChanges} = useContext(UserContext)

  const [author,setAuthor] = useState('')
  const [title,setTitle]  = useState('')
  const [summary,setSummary] = useState('')
  const [imageUrl,setImageUrl] = useState('')
  const [description,setDescription] = useState('')
  const [redirect,setRedirect] = useState(false)

  useEffect(()=>{
    fetch(`http://localhost:5000/post/${id}`,{
        credentials:'include',
    }).then(response=>{
        response.json().then(postInfo=>{
            setAuthor(postInfo.author);
            setTitle(postInfo.title);
            setSummary(postInfo.summary);
            setImageUrl(postInfo.imageUrl);
            setDescription(postInfo.description);
        })
    })
  },[])
  async function handleSubmit(event){
    event.preventDefault();
  fetch(`http://localhost:5000/edit/${id}`, {  // Use correct URL here
    method: 'POST',  // You might want to change this to 'PUT' or 'PATCH' if you're updating an existing post
    body: JSON.stringify({ title, author, description, imageUrl, summary }),
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },})  // Correct URL
    .then(response => {  // Correct arrow function syntax
      console.log(response);  // Log the response for debugging
      if (response.ok) {  // Check if the response status is OK (200-299)
        setAppliedChanges(true);  // Set applied changes to true
        setRedirect(true);  // Trigger redirect
      } else {
        console.error('Failed to fetch data');  // Error handling for non-OK responses
      }
    })
    .catch(error => {
      console.error('Error occurred:', error);  // Catch any fetch errors
    });
}
async function handleContent(event) {
  event.preventDefault()
  const response= await fetch('http://localhost:5000/generate-content',{
    method:'POST',
    credentials:'include',
    body:JSON.stringify({description}),
    headers: {'Content-Type': 'application/json'},  
})
response.json().then((generateContent)=>{
  setDescription(generateContent)
})

}
  if(redirect){
    return <Navigate to ={'/'} />
  }
  return (
    
      <div className="p-2 col-sm-10" >
    <h1 style={{fontWeight:"800"}} className="d-flex justify-content-center">Edit Blog</h1>
    <form onSubmit={handleSubmit}>
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
            <button onClick={handleContent}>Enhance</button>
        </div>
        </div>

        <div className="mb-5 mt-3 row">
        <label className="col-form-label col-sm-2 me-3" htmlFor="imageUrl">Image URL</label>
        <div className="col-sm-8" >
            <input type="text" id="imageUrl" className="form-control" value={imageUrl} onChange={(e)=>setImageUrl(e.target.value)} placeholder="Image URL"/>
        </div>
        </div>

        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-dark col-sm-6">Save changes</button>
        </div>
    </form>
    </div>
    
  )
}

export default EditPost
