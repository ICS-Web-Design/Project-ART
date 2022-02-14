const artware = require("../../middleware/artware")
const express = require('express')
const router = express.Router()
const Profile = require('../../models/ProfileSchema')
const auth = require("../../middleware/auth")
const Grid = require('gridfs-stream')

const upload = artware.upload
const remove = artware.remove

// @route       POST /:id/art
// @desc        Post Artwork
// @access      Private
router.post("/:id/art", auth, upload.single("file"), async (req, res) => {

    const profile = await Profile.findById(req.params.id)

    profile.artworks.push(req.file.id)
    await profile.save()
    console.log(profile)

    res.json({file: req.file})
})

// @route       DEL /:id/art
// @desc        Delete Artwork
// @access      Private
router.delete("/:id/art", auth, async (req, res) => {
    // console.log(req.body.artId)
    remove({_id: req.body.artId})

    const profile = await Profile.findById(req.params.id)

    profile.artworks.splice(profile.artworks.indexOf(req.body.artId), 1)
    await profile.save()
    console.log(profile)

    res.json({msg: req.artId + " has been deleted"})
})

module.exports = router;