import { createContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [authState, setAuthState] = useState()
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    
    let nav = useNavigate()
    if(authState == 'expired'){
        console.log('Auth Expired')
        nav('/login')
    }

    // setInterval(() => {
    //   if(localStorage.getItem('token') !== null){
    //       axios.post('http://localhost:5000/api/profiles/auth', 'auth', {
    //           headers: {
    //               'x-auth-token': localStorage.getItem('token')
    //           }
    //       }).catch((err) => {
    //           if(err.response.status === 401){
    //               localStorage.removeItem('token')
    //               localStorage.removeItem('profile')
    //               setAuthState('expired')
    //           }
    //       })
    //   }
    // }, 600000);


    axios.interceptors.response.use((res) => {
        console.log(res.status)
        return res
    }, (err) => {
        if(err.response.status == 401){
            localStorage.removeItem('token')
            localStorage.removeItem('profile')
        }
        return Promise.reject(err);
    })
  
    return <Context.Provider value={{authState, setAuthState, profile, setProfile}}>
        {children}
    </Context.Provider>
}

export default Context