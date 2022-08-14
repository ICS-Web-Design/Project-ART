import React from 'react'
import {useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate, Link } from 'react-router-dom'

function Artists() {

    const [profiles, setProfiles] = useState([])

    useEffect(() => {
      axios.get(`http://localhost:5000/api/profiles`)
      .then((res) => {
          console.log(res.data);
          setProfiles(res.data.map((profile, index) => {
              return(
                <Link className='card card-body shadow-xl   ' to={`/artists/${profile.id}`} key={index}>
                    <span className='card-title'>{profile.firstName} {profile.lastName}</span>
                    <span>Class of {profile.classOf}</span>
                    <span>Artworks: {profile.artworks.length}</span>
                </Link>
              )
          }))
      })
    }, [])
    
  return (
    <div className="container mx-auto">
        <h1 className="text-4xl text-primary font-bold">Artists</h1>
        {profiles}
    </div>
  )
}

export default Artists