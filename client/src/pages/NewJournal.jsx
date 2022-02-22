import React, {useContext} from 'react'
import axios from 'axios'
import {Context} from '../Context'

function NewJournal() {

    const {profile} = useContext(Context)
    console.log(localStorage.getItem('token'))
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
            console.log(res)
        })
    }

  return (
    <div className='container'>
        <h1>New Journal</h1>
        <input type="text" placeholder='Title' id='title'/>
        <br />
        <textarea className='journalTextarea' name="body" id="body" cols="30" rows="40"></textarea>
        <br />
        <button onClick={postHandler}>Post</button>
    </div>
  )
}

export default NewJournal