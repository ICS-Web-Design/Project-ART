import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate } from 'react-router-dom'

function Login() {

  const {auth, setAuth} = useContext(Context)
  const [login, setLogin] = useState()

  // Redirect to home after logging in
  let nav = useNavigate()
  useEffect(() => {
    if(login === true){
      nav('/')
    }
  })
  

  const loginHandler = () => {
    const credentials = {}
    credentials.email = document.getElementById('email').value
    credentials.password = document.getElementById('password').value

    axios.post('http://localhost:5000/api/profiles/login', credentials)
    .then((res) => {
      console.log(res);
      if(res.data.token){
        setAuth(res.data.token)
        setLogin(true)
      }
    })
    .catch((err) => {
      console.log(err.response.status);
      console.log(err.response.data.errors[0]);
      document.querySelector('.errorContainer').innerHTML = err.response.data.errors[0].msg
    })
  }


    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
              <h4>Login</h4>
              
              <input className="u-full-width" type="email" name="email" id="email" placeholder="Email" />
              <br />
              <input className="u-full-width" type="password" name="password" id="password" />
              <button onClick={loginHandler}>Login</button>
              <br />
              {/* <span onClick={()=>{setView('register')}}>Register</span> */}
              
              <div className="errorContainer error"></div>
          </div>
        </div>
      </div>
    )
  }

export default Login