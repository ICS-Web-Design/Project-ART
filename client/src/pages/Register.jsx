import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {Context} from '../Context'

function Register() {

  const {authState, setAuthState} = useContext(Context)
  const {profile, setProfile} = useContext(Context)
  const [login, setLogin] = useState()

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

    const nav = useNavigate()
    const navToLogin = () => {
      nav('/login')
    }
    // Generate list of years for signing up
    const years = []
    const classOfYears = () => {
      let curYear = new Date().getFullYear()
      for(let i = 0; i < 7; i++){
        years.push(curYear - 1+ i)
      }
    }
    classOfYears()

    const registerHandler = () => {
      const data = {
        firstName : document.getElementById('firstName').value,
        lastName : document.getElementById('lastName').value,
        email : document.getElementById('email').value,
        password : document.getElementById('password').value,
        classOf : document.getElementById('classOf').value
      }

      if(document.getElementById('password').value != document.getElementById('confPassword').value){
        setErrorMessage(
        <div className="alert alert-error shadow-lg">
          Passwords do not match
        </div>)
      } else {
        axios.post('http://localhost:5000/api/profiles', data)
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
    }
    
    return(
        <div className="container mx-auto">
            <div className="row">
              <div className="six columns float-left">
                  <h4 className='font-bold text-xl mb-4'>Register</h4>
  
                  <input type="text" className="input text-primary input-bordered mb-5" id='firstName' placeholder='First Name'/>
                  <br />
                  <input type="text" className="input text-primary input-bordered mb-5" id='lastName' placeholder='Last Name'/>
                  <br />
                  <input className="input text-primary input-bordered mb-5" type="email" name="email" id="email" placeholder="Email" />
                  <br />
                  <span>Year of Graduation</span>
                  <br />
                  <select name="classOf" id="classOf" className="select select-primary w-full max-w-xs">
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                  <br /><br />
                  <input className="input text-primary input-bordered mb-5" type="password" name="password" id="password" placeholder='Enter Password'/>
                  <br />
                  <input className="input text-primary input-bordered mb-5" type="password" name="confPassword" id="confPassword" placeholder='Confirm Password'/>
                  <br />
                  <button className='btn btn-primary' onClick={registerHandler}>Register</button>
                  <br />
                  <span className='btn btn-ghost mt-4' onClick={navToLogin}>Login</span>
              </div>
              <div className="float-left mt-10 ml-10">{errorMessage}</div>
            </div>
          </div>
      )
}

export default Register