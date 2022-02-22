import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {BsBookmarkFill} from 'react-icons/bs'
import {FaHeart} from 'react-icons/fa'

function ArtworkPage() {

  const [art, setArt] = useState({
    image: 'ddd',
    title: null,
    artist: null,
    date: new Date(),
  })
  const params = useParams()
  let artID = params.artid

  useEffect(() => {
    axios.get(`http://localhost:5000/api/art/${artID}/data`)
    .then((res) => {
      setArt(res.data)
    })
  }, [])


  return (
    <div className='container'>
        <img className='centerImage' src={`http://localhost:5000/api/art/${artID}.png`} alt="" />
        <br /><br />

        <span>
          <h1 style={{display: 'inline'}}>{art.title}</h1>
          <div className="u-pull-right">
              <FaHeart className="artPageIcon" size={40}/>
              <BsBookmarkFill className="artPageIcon" size={40}/>
          </div>
        </span>

        <br /><br />
        <div id="artInfo">

          <Link className='artistName' to={`/artists/${art.artistId}`}>{art.artist}</Link>
          <h4>{art.date.toString().substring(0,10)}</h4>
          <p>{art.desc}</p>
          
        </div>
    </div>
  )
}

export default ArtworkPage