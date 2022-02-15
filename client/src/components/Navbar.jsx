import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import '../App.css'

function Navbar() {
  return (
    <nav className='topnav'>

        <div className="container">
   
            <Link to="/">Home</Link>
            <Link to="/gallery">Gallery</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/artists">Artists</Link>
            <Link to="/login">Login</Link>
        </div>
            
    </nav>
  )
}

export default Navbar