const artware = require("../../middleware/artware")
const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const Profile = require('../../models/ProfileSchema')
const auth = require("../../middleware/auth")
const Grid = require('gridfs-stream')
const path = require('path')
const mongoose = require('mongoose')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const config = require('config')
const db = config.get("mongoURI")
const mongo = require('mongodb')
const { MongoClient } = require('mongodb')
const formidable = require('formidable')
const fs = require('fs')
const conn = mongoose.createConnection(db)

let gfs;
let bucket

conn.once('open', () => {
    // Init stream
    gfs = new mongoose.mongo.GridFSBucket(conn.db, {
        bucketName: 'uploads'
    })

    console.log("Artware Active")
})

// Storage engine
var storage = new GridFsStorage({
    url: config.mongoURI,
    file: (req, file) => {
        const data = JSON.parse(req.headers.data)
        const {title, desc, firstName, lastName, _id, comments, likes, saves} = data
            return new Promise((resolve, reject) => {
                const filename = `${title} - ${lastName} - ${new Date().getSeconds()}`
                const metadata = {
                    title,
                    desc,
                    artist: `${firstName} ${lastName}`,
                    artistId: _id,
                    comments,
                    likes,
                    saves
                }
                const fileInfo = {
                  filename: filename,
                  metadata: metadata,
                  bucketName: 'uploads'
                };
                resolve(fileInfo);
            })
    }
})

const store = multer({
storage,
fileFilter: function(req, file, cb){
    checkFileType(file, cb)
}
})

const checkFileType = (file, cb) => {
const filetypes = /jpeg|jpg|png|gif/
const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
const mimetype = filetypes.test(file.mimetype)
if(mimetype && extname) return cb(null, true)
cb('filetype')
}

const uploadMiddleware = (req, res, next) => {
    const upload = store.single('image')
    
    upload(req, res, (err) => {

        if(err instanceof multer.MulterError){
            res.status(400).json('File too large')
        } else if(err){
            if(err === 'filetype') return res.status(400).json('Image files only')
            return res.status(500)
        }
        next()
    })
    
}


const deleteImage = (id) => {
    if(!id || id === 'undefined') return res.status(400).send('no image id')
    const _id = new mongoose.Types.ObjectId(id)
    gfs.delete(_id, err => {
        if(err) return res.status(500).send('image deletion error')
    })
}


// @route       POST art/:id/post
// @desc        Post Artwork 
// @access      Private
router.post("/post", auth, uploadMiddleware, async (req, res) => {   
    const data = JSON.parse(req.headers.data)
    const {_id} = data
    try {
        
        const {file} = req

        let profile = await Profile.findById(_id)
        profile.artworks.push(file.id)
        await profile.save()

        return res.send(file.id)
        
    } catch (error) {
    }
})

// STREAM IMAGE
router.get("/:id.png", async (req, res) => {
    try {
        const artID = req.params.id
        id = new mongoose.Types.ObjectId(artID)

        gfs.openDownloadStream(id).pipe(res)
       
    } catch (error) {
        if(error.toString().includes(' Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters')){
            res.status(404).json('Artwork not found')
        } else {

            res.status(400).json('Error - Please try again')
        }
    }
})

router.get('/:id/data', (req, res) => {
    gfs.find({_id: id}).toArray(async(err, files) => {
        const data = {
            title: files[0].metadata.title,
            desc: files[0].metadata.desc,
            date: files[0].uploadDate,
            artist: files[0].metadata.artist,
            artistId: files[0].metadata.artistId
        }
        res.json(data)
    })
})

// ARTIST PAGE DISPLAY IAMGES
router.get("/:artistID/all", async(req, res) => {
    let id = req.params.artistID
    let profile = await Profile.findById(id)
    let artArr = []

    profile.artworks.forEach((artID) => {
        id = new mongoose.Types.ObjectId(artID)
        gfs.find({_id: id}).toArray(async(err, files) => {
            
            let stream = gfs.openDownloadStream(id)

            function streamToString (stream) {
                const chunks = [];
                return new Promise((resolve, reject) => {
                  stream.on('data', (chunk) => {
                      chunks.push(chunk.toString('base64'))
                    });
                  stream.on('error', (err) => reject(err));
                  stream.on('end', () => {
                        resolve(chunks.join(''))
                  });
                })
              }
              
            const result = await streamToString(stream)
            artArr.push(result)
            console.log(artArr.length)
        })
    })
    if(artArr.length === profile.artworks.length){

        res.json(artArr)
    }
})

// @route       DEL /:id/art
// @desc        Delete Artwork
// @access      Private
// router.delete("/:id/art", auth, async (req, res) => {
//     // console.log(req.body.artId)
//     remove({_id: req.body.artId})

//     const profile = await Profile.findById(req.params.id)

//     profile.artworks.splice(profile.artworks.indexOf(req.body.artId), 1)
//     await profile.save()
//     console.log(profile)

//     res.json({msg: req.artId + " has been deleted"})
// })

module.exports = router;