const { json } = require('express')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/ProfileSchema')
const auth = require('../../middleware/auth')

// @route       POST api/profiles:id/journal
// @desc        Post journal
// @access      Private
router.post('/:id/journal', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile
    console.log(profile)
    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    let d = new Date()
    let date = `${d.getDate()}/${d.getMonth()}/${d.getFullYear()}`
    const post = {
        title: req.body.title,
        body: req.body.body,
        date,
        artworks: req.body.artworks
    }

    profile.journals.push(post)

    await profile.save()

    res.json(profile.journals.length-1)   // SEND JOURNAL INSTEAD OF PROFILE

})

// @route       DEL api/profiles:id/journal/:index
// @desc        Delete journal
// @access      Private
router.delete('/:id/journal/:index', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.journals.length - 1 || index < profile.journals.length - 1){
        res.status(400).json({msg: "This journal does not exist"})
    }

    profile.journals.splice(index, 1)

    await profile.save()

    res.json(profile)
})

// @route       POST api/profiles:id/journal/:index
// @desc        Edit journal
// @access      Private
router.post('/:id/journal/:index', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.journals.length - 1 || index < profile.journals.length - 1){
        res.status(400).json({msg: "This journal does not exist"})
    }
    const post = {
        title: req.body.title,
        body: req.body.body,
        artworks: req.body.artworks
    }

    profile.journals[index] = post

    await profile.save()

    res.json(profile)
})

// @route       GET api/profiles:id/journal/:index
// @desc        Get journal
// @access      Public
router.get('/:id/journal/:index', async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.journals.length - 1 || index < 0){
        res.status(404).json({msg: "This journal does not exist"})
    } else {

        let data = {
            post: profile.journals[index],
            artist: `${profile.firstName} ${profile.lastName}`
        }
    
        res.json(data)
    }
    
})

module.exports = router

