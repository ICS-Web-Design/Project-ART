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
            <div className='columns seven'>
                <div className="dashButtons container u-pull-right">

                    <Link className='dashBtn' to={'/dashboard/art'}>
                        <IoMdImage size={30}></IoMdImage>
                        <b>Add Artwork</b>
                    </Link>

                    <br />

                    <Link className='dashBtn' to={'/dashboard/art'}>  
                        <IoIosAddCircle size={30}/>
                        <b>Create Collection</b>
                    </Link>

                    <br />

                    <Link className='dashBtn' to={'/dashboard/journal'}>  
                        <RiBookFill size={30}/>
                        <b>Journal</b>
                    </Link>

                    <br />

                    <div className="dashBtn" onClick={logout}>
                        <IoMdLogOut size={30}></IoMdLogOut>
                        <b>Logout</b>
                    </div>
                </div>
            </div>
            </>
        )
    } else if (view === "artUpload"){
        return(
            <>
                <AddArtwork></AddArtwork>
                <button onClick={() => {setView('dashboard')}}>Cancel</button>
            </>
        )
    } else if (view === 'createCollection'){
        return(
        <div className="container">
            <div className="row">
            <div className="six columns">
                <h4>Create Collection</h4>
                <input className="u-full-width" type="text" name="title" id="title" placeholder="Collection Title" />
                <br />
                <textarea name="desc" className="u-full-width" id="desc" cols={30} rows={10} placeholder="Description of your collection" defaultValue={""} />
            </div>
            <br /><br /><br /><br /><br /><br /><br /><br /><br />
            <div className="selectArtCard">
                <input type="checkbox" name id />
                <b>Title</b>
                <br />
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASsAAACoCAMAAACPKThEAAAAA1BMVEWusbarQMTwAAAASElEQVR4nO3BMQEAAADCoPVPbQo/oAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAICXAcTgAAG6EJuyAAAAAElFTkSuQmCC" alt="" />
            </div>
            <button type="submit">Submit</button>
            <br />
            <button onClick={() => {setView('dashboard')}}>Cancel</button>
            </div>
        </div>
        )
    } else if (view === 'journal'){
        return(
            <div className='container'>
                <h4>Journals</h4>
                <div onClick={() => setView('newEntry')} className="container u-pull-right">
                    <FaBookMedical size={20}></FaBookMedical>
                    <b>New Entry</b>
                </div>
                <br />
                <div className="journalList">
                    <b>Post Title</b>
                    <span>MM/DD/YYYY</span>
                </div>
            </div>
        )
    } else if (view === 'newEntry'){
        return(
            <div className="container">
                <h4>New Entry</h4>
                // TODO //
                <br />
                {/* TODO - JOURNAL ENTRY FIELDS */}

                <button type="submit">Submit</button>
                <br />
                <button onClick={() => {setView('journal')}}>Cancel</button>
            </div>
        )
    }
}

export default Dashboard