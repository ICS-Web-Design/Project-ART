import React, {useState, useContext} from 'react'
import {Link, Routes} from 'react-router-dom'
import {IoMdImage, IoIosAddCircle} from 'react-icons/io'
import {IoMdLogOut} from 'react-icons/io'
import {RiBookFill} from 'react-icons/ri'
import {FaBookMedical} from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

import { Context } from '../Context'
import AddArtwork from '../pages/AddArtwork'
import Journal from '../pages/Journal'


function Dashboard() {
    const {profile, setProfile} = useContext(Context)
    const {authState, setAuthState} = useContext(Context)

    const nav = useNavigate()
    const logout = () => {
        localStorage.clear()
        setAuthState('logout')
        nav('/login')
    }

    const [view, setView] = useState("dashboard")

    if(view === 'dashboard'){
        return (
            <>
            <div className='float-right mr-40'>

                <Link className='cursor-pointer' to={'/dashboard/art'}>
                    <IoMdImage size={30} color={'hsl(var(--p))'}></IoMdImage>
                    <b>Add Artwork</b>
                    <div></div>
                </Link>

                <br />

                {/* CREATE COLLECTION BUTTON */}
                {/* <Link className='cursor-pointer' to={'/dashboard/art'}>  
                    <IoIosAddCircle size={30} color={'hsl(var(--p))'}/>
                    <b>Create Collection</b>
                    <div></div>
                </Link> */}

                <Link className='cursor-pointer' to={'/dashboard/journal'}>  
                    <RiBookFill size={30} color={'hsl(var(--p))'}/>
                    <b>Journal</b>
                    <div></div>
                </Link>

                <br />

                <div className="cursor-pointer" onClick={logout}>
                    <IoMdLogOut size={30} color={'hsl(var(--p))'}></IoMdLogOut>
                    <b>Logout</b>
                    <div></div>
                </div>
            </div>
            </>
        )
    }
}

export default Dashboard