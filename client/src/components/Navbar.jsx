import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import '../App.css'
import {Context} from '../Context'

function Navbar() {
  const {auth} = useContext(Context)
  const {profile, setProfile} = useContext(Context)
  const [display, setDisplay] = useState({name:'Login', route: '/login'})

  useEffect(() => {
    if(profile != null && auth !== false){
      setDisplay({
        name: profile.firstName,
        route: `/dashboard`
      })
    } else {
      setDisplay({
        name: 'Login',
        route: '/login'
      })
    }
  }, [profile, auth])

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