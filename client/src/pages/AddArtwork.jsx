import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import FormData from 'form-data'
import {Context} from '../Context'
import axios from 'axios'

function AddArtwork() {
  const {profile, setProfile} = useContext(Context)
  const {auth} = useContext(Context)

  let nav = useNavigate()
  if(profile === null){
      nav('/login')
  }

  const postArt = () => {

    // TODO - SEND IMAGE AND METADATA TO SERVER
    let data = new FormData();
    data.append('image', document.getElementById('imageSel').files[0]);
    data.append('title', document.getElementById('title').value)
    data.append('desc', document.getElementById('desc').value)
    data.append('artistID', profile._id)

    console.log(data.getAll('desc'))

    axios.post(`http://localhost:5000/art/${profile._id}/post`, data, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'x-auth-token': auth
      } 
    })
    .then(function (res) {
      //handle success
      console.log(res);
    })
    .catch(function (res) {
      //handle error
      console.log(res);
    });
  }

  return (
    <form className="container">
        <div className="row">
          <div className="six columns">
            <h4>Upload Artwork</h4>
            <label htmlFor="imageSel" className="btn">Select Image</label>
            <input type="file" name="image" id="imageSel" />
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