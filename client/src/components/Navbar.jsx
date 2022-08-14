import React, {useContext, useEffect, useState} from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
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
    <div className="navbar shadow-xl mb-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">Project ART</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <Link className='mx-10' to="/">Home</Link>
          <Link className='mx-10' to="/gallery">Gallery</Link>
          <Link className='mx-10' to="/artists">Artists</Link>
          <Link className='mx-10' to="/about">About</Link>
          <a className='mx-10' href={display.route}>{display.name}</a>
        </ul>
      </div>
    </div>
  )
}

export default Navbar