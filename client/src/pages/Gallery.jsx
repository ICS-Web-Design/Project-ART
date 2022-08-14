import React, {useContext, useState, useEffect} from 'react'
import ArtThumbnail from '../components/ArtThumbnail'
import axios from 'axios'
import LoadingGif from '../components/LoadingGif'
import ArtworkPage from './ArtworkPage'

function Gallery() {

  const [artThumbnails, setArtThumbnails] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
    setLoaded(true)
  }, [artThumbnails])

  useEffect(() => {
    axios.get(`http://localhost:5000/api/art/all`)
    .then((res) => {
      setArtThumbnails(res.data.map((art, index) => {
        return(
                <ArtThumbnail artId={art} key={index}></ArtThumbnail>
            )        
      }))
    }).catch((err) => {
        console.log(err);
    })
  }, [])

  if(loaded === true){
    return (
      <div className='container mx-auto'>
        <h1 className='text-4xl font-bold text-primary'>Gallery</h1>
          {artThumbnails}
      </div>
    )
  } else {
    return(
      <ArtworkPage></ArtworkPage>
      // <LoadingGif></LoadingGif>
    )
  }
}

export default Gallery