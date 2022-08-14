import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import {BsBookmarkFill} from 'react-icons/bs'
import {FaHeart} from 'react-icons/fa'

function ArtworkPage() {
  
  const [bodyMarginLeft, setBodyMarginLeft] = useState({marginLeft: 200 + 'px'})

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

  
  useEffect(() => {

    function getOffset(el) {
      const rect = el.getBoundingClientRect();
      return rect.left + window.scrollX
    }

    let px = getOffset(document.getElementById('artIMG'))
    setBodyMarginLeft({marginLeft: px + 'px'})
    console.log(bodyMarginLeft);
  }, [])

  return(
    <div className="container mx-auto">

      <div className="container mb-40">
        <img id='artIMG' className='mx-auto shadow-inner shadow-3xl' src={`http://localhost:5000/api/art/${artID}.png`} alt="" />

        <div style={{bodyMarginLeft}}>
          <h1 className='text-6xl font-bold mt-10 text-primary'>{art.title}</h1>
          <br />
          <Link className='text-4xl my-20' to={`/artists/${art.artistId}`}>{art.artist}</Link>
          <h4 className='text-2xl'>{art.date.toString().substring(0,10)}</h4>
          <p className='mt-4'>{art.desc}</p>
        </div>
        
      </div>
      
    </div>
  )
}

export default ArtworkPage