import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import LoadingGif from '../components/LoadingGif'

function JournalPage() {

    const params = useParams()
    let id = params.id
    let index = params.index

    const [journal, setJournal] = useState()
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        if(loaded === false){
            axios.get(`http://localhost:5000/api/profiles/${id}/journal/${index}`)
            .then((res) => {
                console.log(res.data)
                setJournal(res.data)
                setLoaded(true)
            })
            .catch((err) => {
                if(err.response.data.status == 404){
                    setLoaded('NOT FOUND')
                }
            })
        }
        
    }, [])

    if(loaded === true){
        return(
            
            <div className="container mx-auto">

                <h1 className='text-4xl font-bold text-primary'>{journal.post.title}</h1>
                <Link to={`/artists/${id}`}>
                    <h3 className='text-2xl mt-3'>{journal.artist}</h3>
                </Link>
                <h4 className='text-xl mt-3'>{journal.post.date}</h4>

                <p>{journal.post.body}</p>
            </div>
        )
    } else if (loaded == 'NOT FOUND'){
        return(
            <div className="container mx-auto">
                <h1 className="text-5xl">NOT FOUND</h1>
            </div>
        )
    } else{
        return (
            <div className='container mx-auto'>
                <div className="btn loading btn-block mx-auto">LOADING</div>
            </div>
          )
    }
  
}

export default JournalPage