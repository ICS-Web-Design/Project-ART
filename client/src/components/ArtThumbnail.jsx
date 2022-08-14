import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ArtThumbnail(props) {

    const [artData, setArtData] = useState({
        title: ''
    })

    let artId = props.artId
    useEffect(() => {
        // Make request to get metadata for image
        axios.get(`http://localhost:5000/api/art/${artId}/data`)
        .then((res) => {
            setArtData(res.data)
        })
    }, [])

    
  return (
    <div className="card lg:card-side bg-base-100 shadow-xl my-6 float-left w-5/12 ml-4">
        <figure><img className='w-80' src={`http://localhost:5000/api/art/${artId}.png`} alt="Art"/></figure>
        <div className="card-body">
            <h2 className="card-title">{artData.title}</h2>
            <p>{artData.desc}</p>

            <div className="card-actions float-left">
                <Link className="btn btn-primary" to={`/artworks/${artId}`}>View</Link>
            </div>
        </div>
    </div>
  )
}

export default ArtThumbnail