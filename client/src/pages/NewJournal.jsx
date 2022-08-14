import React, {useContext, useState, useEffect} from 'react'
import axios from 'axios'
import {Context} from '../Context'
import { useNavigate } from 'react-router-dom'

function NewJournal() {
    
    const {profile} = useContext(Context)

    let nav = useNavigate()
    const postHandler = (e) => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/profiles/${profile._id}/journal`, {
            title: document.getElementById('title').value,
            body: document.getElementById('body').value,
        }, {
            headers: {
                'x-auth-token': localStorage.getItem('token')
            }
        })
        .then((res) => {
            console.log(res);
            nav(`/artists/${profile._id}/journal/${res.data}`)
        })
    }

  return (
    <div className='container mx-auto'>
        <h1 className='text-3xl font-bold text-primary mb-3'>New Journal</h1>
        <input className='input input-bordered mb-3' type="text" placeholder='Title' id='title'/>
        <br />
        <textarea className='input input-bordered' name="body" id="body" cols="30" rows="40"></textarea>
        <br />
        <button className='btn btn-primary' onClick={postHandler}>Post</button>
    </div>
  )
}

export default NewJournal