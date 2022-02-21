import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState, useContext } from 'react';

import Context, {ContextProvider} from './Context';

import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import AddArtwork from './pages/AddArtwork';
import ArtworkPage from './pages/ArtworkPage';
import ArtistPortfolio from './pages/ArtistPortfolio';

import axios from 'axios'


function App() {

  
  return (
    <ContextProvider>
      <Router>
          
        <Navbar></Navbar>

        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route exact path="/register" element={<Register/>}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/dashboard/art" element={<AddArtwork />}></Route>
            <Route path='/artworks/:artid' element={<ArtworkPage/>}></Route>
            <Route path='/artists/:id' element={<ArtistPortfolio/>}></Route>
        </Routes>
          
      </Router>
    </ContextProvider>
  );
}

export default App;
