import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import {Context} from '../Context'
import axios from 'axios'

function AddArtwork() {
  const {profile, setProfile} = useContext(Context)
  const {auth} = useContext(Context)

  const [file, setFile] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [inputContainsFile, setInputContainsFile] = useState(false)
  const [progress, setProgress] = useState(null)
  const [currentlyUploading, setCurrentlyUploading] = useState(false)

  let nav = useNavigate()
  if(profile === null){
      nav('/login')
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
    setInputContainsFile(true)
  }

  const fileUploadHandler = () => {
    const fd = new FormData()
    fd.append('image', file, file.name)
    // fd.append('title', document.getElementById('title').value)
    // fd.append('desc', document.getElementById('desc').value)
    // fd.append('firstName', profile.firstName)
    // fd.append('lastName', profile.lastName)
    // fd.append('_id', profile._id)
    const data = {
      title: document.getElementById('title').value,
      desc: document.getElementById('desc').value,
      firstName: profile.firstName,
      lastName: profile.lastName,
      _id: profile._id,
      comments: [],
      saves: [],
      likes: []
    }
    let stringData = JSON.stringify(data)

    axios.post(`http://localhost:5000/api/art/post`, fd, {
      headers: {
        'x-auth-token': auth,
        'content-type': 'application/x-www-form-urlencoded',
        'data': stringData
      },
      onUploadProgress: (progressEvent) => {
        setProgress((progressEvent.loaded/progressEvent.total)*100)
        console.log('Upload progress: ', Math.round((progressEvent.loaded/progressEvent.total)*100))
      }
    }).then(({data}) => {
      nav(`/artworks/${data}`)
      setImageId(data)
      setFile(null)
      setInputContainsFile(false)
      setCurrentlyUploading(false)
    }).catch((err) => {
      console.log(err)
      if(err.response.status === 400){
        // ERROR HANDLER - TODO
      }
    })
  }

  const postArt = (e) => {
    
    e.preventDefault();
    if(inputContainsFile){
      fileUploadHandler()
    }
  }

  return (
    <form className="container">
        <div className="row">
          <div className="six columns">
            <h4>Upload Artwork</h4>
            <label htmlFor="imageSel" className="btn">Select Image</label>
            <input onChange={handleFile} type="file" name="file" id="file" />
            <br />
            <input className="u-full-width" type="text" name="title" id="title" placeholder="Artwork Title" />
            <br />
            <textarea name="desc" className="u-full-width" id="desc" cols={30} rows={10} placeholder="Description of your masterpiece" defaultValue={""} />
            <button onClick={postArt}>Upload</button>
          </div>
        </div>
    </form>
  )
}

export default AddArtwork