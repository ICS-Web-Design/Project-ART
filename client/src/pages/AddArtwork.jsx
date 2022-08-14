import React, {useContext, useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import {Context} from '../Context'
import axios from 'axios'
import LoadingGif from '../components/LoadingGif'

function AddArtwork() {
  const {profile, setProfile} = useContext(Context)
  const {auth} = useContext(Context)

  const [file, setFile] = useState(null)
  const [imageId, setImageId] = useState(null)
  const [inputContainsFile, setInputContainsFile] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentlyUploading, setCurrentlyUploading] = useState(false)
  const [imgPreview, setImgPreview] = useState('')

  
  const [errorMessage, setErrorMessage] = useState('')
  const [view, setView] = useState('form')

  useEffect(() => {
    if(errorMessage != ''){
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }, [errorMessage])

  let nav = useNavigate()
  if(profile === null){
      nav('/login')
  }

  const handleFile = (e) => {
    setFile(e.target.files[0])
    setImgPreview(URL.createObjectURL(e.target.files[0]))
    setInputContainsFile(true)
  }

  useEffect(() => {
    if(file != null && file.type.includes('image') == false){
      setErrorMessage(
        <div className="alert alert-error shadow-lg">
          Please upload images only
        </div>
      )
    }
  }, [file])
  

  const fileUploadHandler = () => {
    const fd = new FormData()
    fd.append('image', file, file.name)
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

    if(data.title == ''){
      setErrorMessage(
        <div className="alert alert-error shadow-lg">
          Please enter a title
        </div>
      )
    } else if(file.type.includes('image')){
      axios.post(`http://localhost:5000/api/art/post`, fd, {
        headers: {
          'x-auth-token': localStorage.getItem('token'),
          'content-type': 'application/x-www-form-urlencoded',
          'data': stringData
        },
        onUploadProgress: (progressEvent) => {
          setProgress((progressEvent.loaded/progressEvent.total)*100)
          setView('loading')
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
          setErrorMessage(
            <div className="alert alert-error shadow-lg">
            {err.response.data.errors[0].msg}
            </div>
          )
        }
      })
    }

  }

  const postArt = (e) => {
    
    e.preventDefault();
    if(inputContainsFile){
      fileUploadHandler()
    }
  }

  const cancelHandler = (e) => {
    e.preventDefault();
    nav(`/artists/${profile._id}`)
  }

  if(view == 'form'){
    return (
      <form className="container mx-auto">
          <div className="float-left">
            <div className="six columns">
              <h1 className='text-3xl font-bold mb-3 text-primary'>Upload Artwork</h1>
              <input onChange={handleFile} className='' type="file" name="file" id="file" />
              <br />
              <input className="input input-bordered mt-3 w-80" type="text" name="title" id="title" placeholder="Artwork Title" />
              <br />
              <textarea name="desc" className="input input-bordered mt-3 w-80 h-40" id="desc" cols={30} rows={30} placeholder="Description of your masterpiece" defaultValue={""} />
              <br />
              <button className='btn btn-primary' onClick={postArt}>Upload</button>
              <br />
              <button className='btn btn-ghost mt-3' onClick={cancelHandler}>Cancel</button>
            </div>
          </div>
  
          <br />
          <div className="float-left ml-20">
            <img className='h-80' src={imgPreview} alt="" />
            {errorMessage}
          </div>
      </form>
    )
  } else if (view == 'loading'){
    return(
      <div className="container mx-auto">
        <button className="btn loading w-10/12 mx-auto"></button>
      </div>
    )
  }

 
}

export default AddArtwork