import { createContext, useState } from "react";

export const Context = createContext()

export const ContextProvider = ({children}) => {
    const [auth, setAuth] = useState('false')
    const [profile, setProfile] = useState(JSON.parse(localStorage.getItem('profile')))
    

    return <Context.Provider value={{auth, setAuth, profile, setProfile}}>
        {children}
    </Context.Provider>
}

export default Context