import React, {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate } from 'react-router-dom'

function Login() {

  const {authState, setAuthState} = useContext(Context)
  const {profile, setProfile} = useContext(Context)

  const [login, setLogin] = useState()

  // Redirect to home after logging in
  let nav = useNavigate()
  const navToRegister = () => {
    nav('/register')
  }

  const [errorMessage, setErrorMessage] = useState('')

  useEffect(() => {
    if(errorMessage != ''){
      setTimeout(() => {
        setErrorMessage('')
      }, 3000);
    }
  }, [errorMessage])

  useEffect(() => {
    if(login === true){
      let email = document.getElementById('email').value
      
      let options = {
        headers: {
          'x-auth-token': localStorage.getItem('token')
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
        localStorage.setItem('token', res.data.token);
        setAuthState('logged in')
        setLogin(true)
      }
    })
    .catch((err) => {
      setErrorMessage(
        <div className="alert alert-error shadow-lg">
          {err.response.data.errors[0].msg}
        </div>
      )
    })
  }


    return (
      <div className="container mx-auto">
        <div className="row">
          <div className="six columns float-left">
              <h4 className='font-bold text-xl mb-4'>Login</h4>
              
              <input className="input text-primary input-bordered mb-5" type="email" name="email" id="email" placeholder="Email" />
              <br />
              <input className="input text-primary input-bordered mb-5" type="password" name="password" id="password" placeholder='Password'/>
              <br />
              <button className='btn btn-primary' onClick={loginHandler}>Login</button>
              <br />
              <span className='btn btn-ghost mt-4 ' onClick={navToRegister}>Register</span>
              
              
          </div>
          <div className="float-left mt-10 ml-10">{errorMessage}</div>
        </div>
      </div>
    )
  }

export default Login