import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useState } from 'react';

import {ContextProvider} from './Context';

import Login from './pages/Login';
import Register from './pages/Register'
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';

import axios from 'axios'

axios.interceptors.response.use((response) => {
  return response
}, (err) => {
  console.log(err.response)
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
            <Route exact path="/register" element={<Register/>}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
        </Routes>
          
      </Router>
    </ContextProvider>
  );
}

export default App;
