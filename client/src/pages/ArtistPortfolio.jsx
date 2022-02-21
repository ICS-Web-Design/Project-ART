import React,{useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import ArtThumbnail from '../components/ArtThumbnail'

function ArtistPortfolio() {
    console.log("XXX")

    const [profile, setProfile] = useState({
        firstName: '',
        lastName: '',
        artworks: [0],
        state: null
    })
    const [loaded, setLoaded] = useState(false)
    const [thumbnails, setThumbnails] = useState([])
    
    const params = useParams()

    let artThumbnails;
    
    useEffect(() => {
        axios.get(`http://localhost:5000/api/profiles/${params.id}`)
        .then((res) => {
            setProfile(res.data)
            setLoaded(true)
        })
    }, [])

    if(loaded === true && profile.firstName != ''){
        artThumbnails = profile.artworks.map((art, index) => {
            console.log(index)
            return(
                    <ArtThumbnail artId={art} key={index}></ArtThumbnail>
                )        
        })
        console.log(artThumbnails)
    }

    // useEffect(() => {
    //     let newThumbnails = []
    //     profile.artworks.forEach((art, index) => {
    //         console.log(index, newThumbnails[index])
    //         newThumbnails.push(
    //                 <ArtThumbnail artId={art} key={index}></ArtThumbnail>
    //             )  
    //     })
    //     setThumbnails(newThumbnails)   
    //     console.log(thumbnails)
    // }, [loaded])
    
   


    if(loaded === true){

        return (
            <div className='container'>
                <div id="container flex" style={{padding: '2%'}}>
                    <div className="row">
                        {/* <div className="column one"> 
                            <div style={{background: '#C4C4C4', borderRadius: '50%', width: '100px', height: '100px'}}> </div>
                        </div> */}
                        <div className="column two">
                            <div className="row">
                                <h5>{profile.firstName + " " + profile.lastName}</h5>
                                <h5>Class 0f: {profile.classOf} </h5>
                            </div>
                         </div>
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
                eirufh
            </div>
        )
    }


  
}

export default ArtistPortfolio