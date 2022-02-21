import React from 'react'
import axios from 'axios'

function Register() {

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
      axios.post('http://localhost:5000/api/profiles', data)
    }
    
    return(
        <div className="container">
            <div className="row">
              <div className="six columns">
                  <h4>Register</h4>
  
                  <input type="text" className="u-full-width" id='firstName' placeholder='First Name'/>
  
                  <input type="text" className="u-full-width" id='lastName' placeholder='Last Name'/>
                  
                  <input className="u-full-width" type="email" name="email" id="email" placeholder="Email" />
  
  
                  <span>Year of Graduation</span>
                  <br />
                  <select name="classOf" id="classOf">
                    {years.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
  
                  <input className="u-full-width" type="password" name="password" id="password" placeholder='Enter Password'/>
  
                  <input className="u-full-width" type="password" name="confPassword" id="confPassword" placeholder='Confirm Password'/>
                  <button onClick={registerHandler}>Register</button>
                  <br />
                  {/* <span onClick={() => setView('login')}>Login</span> */}
              </div>
            </div>
          </div>
      )
}

export default Register