import React, {useState} from 'react'

function Login() {

  const [action, setAction] = useState('login')

  const handleRegister = (e) => {
    e.preventDefault()
    setAction('register')
  }

  const handleLogin = () => {
    setAction('login')
  }

  const years = []

  const classOfYears = () => {
    let curYear = new Date().getFullYear()
    for(let i = 0; i < 7; i++){
      years.push(curYear - 1+ i)
    }
  }
  classOfYears()
  

  if(action === 'login'){
    return (
      <div className="container">
        <div className="row">
          <div className="six columns">
              <h4>Login</h4>
              
              <input className="u-full-width" type="email" name="email" id="email" placeholder="Email" />
              <br />
              <input className="u-full-width" type="password" name="password" id="password" />
              <button>Login</button>
              <br />
              <span onClick={()=>{setAction('register')}}>Register</span>
          </div>
        </div>
      </div>
    )
  } else if (action === 'register'){
    return(
      <div className="container">
          <div className="row">
            <div className="six columns">
                <h4>Register</h4>

                <input type="text" className="u-full-width" placeholder='First Name'/>

                <input type="text" className="u-full-width" placeholder='Last Name'/>
                
                <input className="u-full-width" type="email" name="email" id="email" placeholder="Email" />


                <span>Year of Graduation</span>
                <br />
                <select name="classOf" id="classOf">
                  {years.map((year) => (
                    <option value={year}>{year}</option>
                  ))}
                </select>

                <input className="u-full-width" type="password" name="password" id="password" placeholder='Enter Password'/>

                <input className="u-full-width" type="password" name="confPassword" id="confPassword" placeholder='Confirm Password'/>
                <button>Login</button>
                <br />
                <span onClick={handleLogin}>Login</span>
            </div>
          </div>
        </div>
    )
  }
  
}

export default Login