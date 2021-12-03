const { json } = require('express')
const bcrypt = require('bcryptjs')
const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const config = require('config')
const {check, validationResult} = require('express-validator')
const Profile = require('../../models/ProfileSchema')
const auth = require('../../middleware/auth')

// @route       POST api/profiles:id/collections
// @desc        Post collection
// @access      Private
router.post('/:id/collections', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const collection = {
        title: req.body.title,
        desc: req.body.desc,
        artworks: req.body.artworks
    }

    profile.collections.push(collection)

    await profile.save()

    res.json(profile)

})

// @route       DEL api/profiles:id/collections/:index
// @desc        Delete collection
// @access      Private
router.delete('/:id/collections/:index', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.collections.length - 1 || index < profile.collections.length - 1){
        res.status(400).json({msg: "This collection does not exist"})
    }

    profile.collections.splice(index, 1)

    await profile.save()

    res.json(profile)
})

// @route       POST api/profiles:id/collections/:index
// @desc        Edit collection
// @access      Private
router.post('/:id/collections/:index', auth, async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.collections.length - 1 || index < profile.collections.length - 1){
        res.status(400).json({msg: "This collection does not exist"})
    }

    const post = {
        title: req.body.title,
        desc: req.body.desc,
        artworks: req.body.artworks
    }

    profile.collections[index] = post

    await profile.save()

    res.json(profile)
})

// @route       GET api/profiles:id/collection/:index
// @desc        Get collection
// @access      Public
router.get('/:id/collections/:index', async (req, res) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
        res.status(400).json({msg: "This artist does not exist"})
    }

    const index = req.params.index

    if(index > profile.collections.length - 1 || index < profile.collections.length - 1){
        res.status(400).json({msg: "This collections does not exist"})
    }

    res.json(profile.collections[index])
})

module.exports = router