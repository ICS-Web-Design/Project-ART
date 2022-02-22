import React, {useEffect, useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

function ArtThumbnail(props) {

    const [artData, setArtData] = useState({
        title: ''
    })

    let artId = props.artId
    useEffect(() => {
        console.log(artId)
        axios.get(`http://localhost:5000/api/art/${artId}/data`)
        .then((res) => {
            setArtData(res.data)
            console.log(artData)
        })
    }, [])

    
  return (
      <Link to={`/artworks/${artId}`}>
        <div className="row">
            <div className="columns four">
                <h4 style={{paddingLeft: '4%'}}>{artData.title}</h4>
                <img src={`http://localhost:5000/api/art/${artId}.png`} style={{width:'500px'}} alt="" />
            </div>
            <p className='columns six' style={{marginTop: '10%'}}>{artData.desc}</p>
        </div>
            <hr />
      </Link>
  )
}

export default ArtThumbnail