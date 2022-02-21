import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
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
        <div id="artInfo">
          <div className="u-pull-left">
            <h1>{art.title}</h1>
            <h2>{art.artist}</h2>
            {/* <h3>{art.date.toString().substring(0,10)}</h3> */}
            <p>{art.desc}</p>
          </div>
          <div className="u-pull-right">
            <BsBookmarkFill className="artPageIcon" size={30}/>
            <FaHeart className="artPageIcon" size={30}/>
          </div>
        </div>
    </div>
  )
}

export default ArtworkPage