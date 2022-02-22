import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import '../App.css'
import {Context} from '../Context'
import axios from 'axios'

function Navbar() {
  const {authState, setAuthState} = useContext(Context)
  const {profile, setProfile} = useContext(Context)
  const [display, setDisplay] = useState({name:'Login', route: '/login'})
  
  useEffect(() => {
    if(profile != null && localStorage.getItem('token') !== null){
      setDisplay({
        name: profile.firstName,
        route: `/artists/${profile._id}`
      })
    } else {
      setDisplay({
        name: 'Login',
        route: '/login'
      })
    }
  }, [profile, authState])

  return (
    <nav className='topnav'>

        <div className="container">
   
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/artists">Artists</Link>
            <Link to={display.route}>{display.name}</Link>
        </div>
            
    </nav>
  )
}

export default Navbar