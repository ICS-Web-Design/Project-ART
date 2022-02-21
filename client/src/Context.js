import { createContext, useState } from "react";
import axios from 'axios'
export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [auth, setAuth] = useState('false')
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    
    axios.interceptors.response.use((response) => {
        return response
      }, (err) => {
        if(err.response.status == 401){
          localStorage.setItem('token', 'false');
          localStorage.setItem('profile', null)
          setAuth('false')
          setProfile(null)
        }
        return Promise.reject(err);
      });

    return <Context.Provider value={{auth, setAuth, profile, setProfile}}>
        {children}
    </Context.Provider>
}

export default Context