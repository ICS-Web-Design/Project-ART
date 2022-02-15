import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

import Login from './pages/Login';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <Router>
        
      <Navbar></Navbar>

      <Routes>
          <Route exact path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/api/profiles/:id" element={<Portfolio />}></Route>
      </Routes>
        
    </Router>
  );
}

export default App;
