import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate } from 'react-router-dom'

function Login() {

  const {auth, setAuth} = useContext(Context)
  const {profile, setProfile} = useContext(Context)

  const [login, setLogin] = useState()

  // Redirect to home after logging in
  let nav = useNavigate()
  useEffect(() => {
    if(login === true){
      let email = document.getElementById('email').value
      
      let options = {
        headers: {
          'x-auth-token': auth
        }
      }
      axios.post('http://localhost:5000/api/profiles/me', {email}, options)
      .then((res) => {
        if(res.status == 200){
          let profile = {
            firstName: res.data.firstName,
            lastName: res.data.lastName,
            _id: res.data._id
          }
          setProfile(profile)
          localStorage.setItem('profile', JSON.stringify(profile))
        }
      })
      nav('/')
    }
  }, [login])
  

  const loginHandler = () => {
    const credentials = {}
    credentials.email = document.getElementById('email').value
    credentials.password = document.getElementById('password').value

    axios.post('http://localhost:5000/api/profiles/login', credentials)
    .then((res) => {
      if(res.data.token){
        setAuth(res.data.token)
        setLogin(true)
        localStorage.setItem('token', res.data.token);
      }
    })
    .catch((err) => {
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