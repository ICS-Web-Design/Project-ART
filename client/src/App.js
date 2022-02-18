import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

import {ContextProvider} from './Context';

import Login from './pages/Login';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

import axios from 'axios'

axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  if(err.response.status == 401){
    localStorage.setItem('token', 'false');
    localStorage.setItem('profile', null)
  }
  return Promise.reject(err);
});

function App() {
  
  // const [auth, setAuth] = useState('false')
  return (
    <ContextProvider>
      <Router>
          
        <Navbar></Navbar>

        <Routes>
            <Route exact path="/" element={<Home/>}></Route>
            <Route exact path="/login" element={<Login/>}></Route>
            <Route path="/api/profiles/:id" element={<Portfolio />}></Route>
        </Routes>
          
      </Router>
    </ContextProvider>
  );
}

export default App;
