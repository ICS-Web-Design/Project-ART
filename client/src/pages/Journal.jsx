import React, {useContext, useState, useEffect} from 'react'
import {FaBookMedical} from 'react-icons/fa'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate, Link } from 'react-router-dom'
import LoadingGif from '../components/LoadingGif'

function Journal() {
    const {profile} = useContext(Context)
    const [loaded, setLoaded] = useState(false)
    const [journalList, setJournalList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${profile._id}`)
            .then((res) => {
                console.log(res.data.journals);
                setJournalList(res.data.journals.map((journal, index) => {
                    // /:id/journal/:index
                    return (<Link className='card card-bordered shadow-md mt-3' to={`/artists/${profile._id}/journal/${index}`} key={index}>
                        <b className='mr-10 ml-5 mt-2 card-title'>{journal.title}</b>
                        <span className='ml-5'>{journal.date}</span>
                        <br />
                        </Link>)
                }))
                setLoaded(true)
        })
    }, [])

    // let journalList;
    const navToNewJournal = () => {
        nav('/dashboard/journal/new')
    }

    let nav = useNavigate()

    if(loaded === true){
        return(
            <div className='container mx-auto'>
                <h4 className='text-4xl font-bold text-primary mb-10'>Journals</h4>
                <div className="cursor-pointer" onClick={() => navToNewJournal()}>
                    <FaBookMedical color={'hsl(var(--p))'} size={40}></FaBookMedical>
                    <b className='float-left text-primary'>New Entry</b>
                </div>
                <br />
                <br />

                <div>
                {journalList}
                </div>
            </div>
        )
    } else {
        return(
            <div className="container mx-auto">
                <div className="btn loading btn-block mx-auto">LOADING</div>
            </div>
        )
    }
    
}

export default Journal