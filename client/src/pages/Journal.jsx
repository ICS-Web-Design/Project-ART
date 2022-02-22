import React, {useContext, useState, useEffect} from 'react'
import {FaBookMedical} from 'react-icons/fa'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate, Link } from 'react-router-dom'

function Journal() {
    const {profile} = useContext(Context)
    const [loaded, setLoaded] = useState(false)
    const [journalList, setJournalList] = useState([])

    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${profile._id}`)
            .then((res) => {
                setJournalList(res.data.journals.map((journal, index) => {
                    // /:id/journal/:index
                    return (<Link to={`/artists/${profile._id}/journal/${index}`} key={index}>
                        <b>{journal.title}</b>
                        <span>{journal.date}</span>
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
        console.log(journalList)
        return(
            <div className='container'>
                <h4>Journals</h4>
                <div className="container u-pull-right" onClick={navToNewJournal}>
                    <FaBookMedical size={20}></FaBookMedical>
                    <b>New Entry</b>
                </div>
                <br />
                <div className="journalList">
                    <b>Post Title</b>
                    <span>MM/DD/YYYY</span>
                    
                </div>

                <div>
                {journalList}
                </div>
            </div>
        )
    } else {
        return(
            <div>loading</div>
        )
    }
    
}

export default Journal