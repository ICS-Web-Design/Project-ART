import React,{useEffect, useState, useContext} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import ArtThumbnail from '../components/ArtThumbnail'
import DashboardButtons from '../components/DashboardButtons'
import LoadingGif from '../components/LoadingGif'
import { Context } from '../Context'

function ArtistPortfolio() {

    const [viewProfile, setViewProfile] = useState({
        firstName: '',
        lastName: '',
        artworks: [],
        state: null
    })
    
    const {profile, setProfile} = useContext(Context)
    const [loaded, setLoaded] = useState(false)
    const [view, setView] = useState('artworks')
    const [displayItems, setDisplayItems] = useState([])
    
    let nav = useNavigate()
    const params = useParams()

    let dashboardButtons = ''

    if(profile != null){
        if(params.id == profile._id && localStorage.getItem('token')){
            dashboardButtons = <DashboardButtons></DashboardButtons>
        }
    }
    
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${params.id}`)
        .then((res) => {
            setViewProfile(res.data)
            setLoaded(true)
        }).catch((err) => {
            setLoaded('ERROR')
        })
    }, [params.id])

    useEffect(() => {
        if(loaded === true && viewProfile.firstName != ''){
            console.log(viewProfile.artworks);
            setDisplayItems(
                viewProfile.artworks.map((art, index) => {
                    return(
                            <ArtThumbnail artId={art} key={index}></ArtThumbnail>
                        )        
                }).reverse()
            )
        }
    }, [loaded, params.id])

    useEffect(() => {
        if(view == 'artworks'){
            setDisplayItems(
                viewProfile.artworks.map((art, index) => {
                    return(
                            <ArtThumbnail artId={art} key={index}></ArtThumbnail>
                        )        
                }).reverse()
            )
            if(document.getElementById('artworksBtn') != null){
                document.getElementById('artworksBtn').className = 'text-primary cursor-pointer btn btn-primary text-neutral'
                document.getElementById('journalBtn').className = 'text-primary cursor-pointer ml-80 btn-outline btn'
            }
        } else if (view == 'journals'){
            setDisplayItems(viewProfile.journals.map((journal, index) => {
                return (<Link className='card card-bordered shadow-md' to={`/artists/${viewProfile._id}/journal/${index}`} key={index}>
                    <b className='mr-10 ml-5 mt-2 card-title'>{journal.title}</b>
                    <span className='text-xl ml-5'>{journal.date}</span>
                    <br />
                    </Link>)
            }))
            if(document.getElementById('journalBtn') != null){
                document.getElementById('journalBtn').className = 'text-primary cursor-pointer btn ml-80 btn-primary text-neutral'
                document.getElementById('artworksBtn').className = 'text-primary cursor-pointer btn-outline btn'
            }
        } else {
            setDisplayItems([])
        }
    }, [view, params.id])

    if(loaded === true){

        return (
            <div className='container mx-auto '>
                
                <div className='h-60'>
                    <div className="float-left">
                        <h1 className='font-bold text-4xl text-primary'>{viewProfile.firstName + " " + viewProfile.lastName}</h1>
                        <h5 className='text-2xl'>Class Of: {viewProfile.classOf} </h5>
                    </div>
                    {dashboardButtons}      
                </div>

                <div className='mt-10'>
                    <span onClick={() => setView('artworks')} className='text-primary cursor-pointer btn btn-primary text-neutral' id='artworksBtn'>Artworks</span>
                    <span onClick={() => setView('journals')} className='text-primary cursor-pointer ml-80 btn-outline btn' id='journalBtn'>Journal</span>
                    <hr className='my-5' />
                    {displayItems}
                </div>

          </div>
          )
    } else if(loaded === false){
        return(
            <div className="container mx-auto">
                <div className="btn loading btn-block btn-lg mx-auto">Loading</div>
            </div>
        )
    } else if(loaded === 'ERROR'){
        return(
            <div className="container">
                <h1>Error: Please try again</h1>
            </div>
        )
    }


  
}

export default ArtistPortfolio