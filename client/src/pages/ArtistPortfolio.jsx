import React,{useEffect, useState} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import ArtThumbnail from '../components/ArtThumbnail'
import DashboardButtons from '../components/DashboardButtons'
import { cookie } from 'express-validator'

function ArtistPortfolio() {

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        artworks: [0],
        state: null
    })
    const [loaded, setLoaded] = useState(false)
    const [thumbnails, setThumbnails] = useState([])
    
    const params = useParams()

    let nav = useNavigate()
    let dashboardButtons = ''
    if(profile._id === params.id){
        dashboardButtons = <DashboardButtons/>
    }

    let artThumbnails;
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${params.id}`)
        .then((res) => {
            setProfile(res.data)
            setLoaded(true)
        }).catch((err) => {
            console.log(err);
        })
    }, [])

    if(loaded === true && profile.firstName != ''){
        artThumbnails = profile.artworks.map((art, index) => {
            console.log(index)
            return(
                    <ArtThumbnail artId={art} key={index}></ArtThumbnail>
                )        
        })
        artThumbnails = artThumbnails.reverse()
    }

    if(loaded === true){

        return (
            <div className='container'>
                <div id="container flex">
                        <div className="row">
                            <div className="columns four u-pull-left">
                                <h5>{profile.firstName + " " + profile.lastName}</h5>
                                <h5>Class 0f: {profile.classOf} </h5>
                            </div>
                            
                            {dashboardButtons}
                         </div>

        
        
                <div className="row" style={{paddingTop: '2%'}}>
                    <div className="columns three">
                    <h5>Artworks</h5>
                    </div>
                    <div className="columns three" style={{textAlign: 'right'}}>
                    <h5>Collection</h5>
                    </div>
                </div>
                </div>
                <div id="container flex" style={{paddingLeft: '2%'}}>
                    <hr />
                
                <div>
                    {artThumbnails}
                </div>


                {/* <div className="row">
                    <div className="columns six">
                    <div className="row">
                        <div style={{width: '100%', height: '250px', border: '1px solid #000', backgroundColor: '#E5E5E5'}} />
                    </div>
                    <div className="row">
                        <h4 style={{paddingLeft: '2%'}}>"Title"</h4>
                    </div>
                    </div>
                </div> */}
        
                
                </div>
                <div id="container flex" style={{paddingLeft: '2%'}}>
                <div className="row">
                    <div className="columns seven">
                    <div className="row">
                        <div style={{width: '100%', height: '350px', border: '1px solid #000', backgroundColor: '#E5E5E5'}} />
                    </div>
                    </div>
                    <div className="columns three">
                    <div className="row">
                        <h4>Collection Title</h4>
                    </div>
                    <div className="row">
                        <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
                        labore et dolore magna. "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do 
                        eiusmod tempor incididunt ut labore et dolore magna.
                        </p>
                    </div>
                    </div>
                </div>
            </div>
          </div>
          )
    } else {
        return(
            <div className="container">
                LOADING
            </div>
        )
    }


  
}

export default ArtistPortfolio