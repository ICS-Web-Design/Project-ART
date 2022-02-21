import React, {useEffect, useState} from 'react'
import axios from 'axios'

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
        })
    }, [])

    
  return (
        <div className="row">
            <h1>{props.key}</h1>
            <div className="columns four">
                <h2 style={{paddingLeft: '2%'}}>{artData.title}</h2>
                <img src={`http://localhost:5000/api/art/${artId}.png`} style={{width:'500px'}} alt="" />
            </div>
            <p className='columns six'>{artData.desc}</p>
            <hr />
        </div>
  )
}

export default ArtThumbnail