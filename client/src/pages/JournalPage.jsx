import React, {useEffect, useState} from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'

function JournalPage() {

    const params = useParams()
    let id = params.id
    let index = params.index

    const [journal, setJournal] = useState()
    const [loaded, setLoaded] = useState(false)
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${id}/journal/${index}`)
        .then((res) => {
            console.log(res.data)
            setJournal(res.data)
            setLoaded(true)
        })
    }, [])

    if(loaded === true){
        return(
            <div className="container">

                <h1>{journal.post.title}</h1>
                <Link to={`/artists/${id}`}>
                    <h3>{journal.artist}</h3>
                </Link>
                <h4>{journal.post.date}</h4>

                <p>{journal.post.body}</p>
            </div>
        )
    } else {
        return (
            <div className='container'>
                loading
            </div>
          )
    }
  
}

export default JournalPage