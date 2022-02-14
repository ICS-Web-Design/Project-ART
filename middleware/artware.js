const express = require('express')
// const path = require('path')
const crypto = require('crypto')
const mongoose = require('mongoose')
const multer = require('multer')
const {GridFsStorage} = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const Profile = require('../models/ProfileSchema')
const mongo = require('mongodb')
const config = require('config')
const db = config.get("mongoURI")

const conn = mongoose.createConnection(db)

let gfs;

conn.once('open', () => {
    // Init stream
    console.log("Art ting")
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('artworks')
})

const storage = new GridFsStorage({
  url: config.mongoURI,
  file: async (req, file) => {
    const profile = await Profile.findById(req.params.id)         // Fetch profile

    if(!profile){
      res.status(400).json({msg: "This artist does not exist"})
    }

    const d = new Date();
    const date =`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`

    const metadata = {
      title: req.body.title,
      date: date,
      desc: req.body.desc,
      artist: `${profile.firstName} ${profile.lastName}`,
      references: [],
      comments: [],
      saves: [],
      likes: []
    }

    const filename = `${profile.firstName.substring(0,3)}-${profile.lastName.substring(0,3)}: ${metadata.title} / ${date}`

    return new Promise((resolve, reject) => {

      try {
        
        const fileInfo = {
          filename: filename,
          metadata: metadata,
          bucketName: 'artworks'
        };

        resolve(fileInfo);

      } catch (error) {
        return reject(error)
      }
    });
  }
});

const upload = multer({ storage });

const remove = (artId) => {
  gfs.remove({ _id: artId._id, root: 'uploads' }, (err, gridStore) => {
    if (err) {
      return res.status(404).json({ err: err });
    }
  });
}

const artware = {
    upload: upload,
    remove: remove
}

module.exports = artware;

