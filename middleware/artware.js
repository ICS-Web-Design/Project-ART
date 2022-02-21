
  // const path = require('path')
  // const mongoose = require('mongoose')
  // const multer = require('multer')
  // const {GridFsStorage} = require('multer-gridfs-storage')
  // const config = require('config')
  // const db = config.get("mongoURI")

  // const conn = mongoose.createConnection(db)

  // let gfs;

  // conn.once('open', () => {
  //     // Init stream
  //     gfs = new mongoose.mongo.GridFSBucket(conn.db), {
  //       bucketName: 'artworks'
  //     }
  //     console.log("Artware Active")
  //     // gfs = Grid(conn.db, mongoose.mongo)
  //     // gfs.collection('artworks')
  // })

  // // Storage engine

  // const storage = new GridFsStorage({
  //   url: config.mongoURI,
  //   options: {useUnifiedTopology: true},
  //   file: async (req, file) => {
  //     return new Promise((resolve, reject) => {
  //       try {
  //         const d = new Date();
  //         const date =`${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`

  //         const metadata = {
  //           title: req.body.title,
  //           date: date,
  //           desc: req.body.desc,
  //           artist: `${req.body.firstName} ${req.body.lastName}`,
  //           artistID: req.body._id,
  //           references: [],
  //           comments: [],
  //           saves: [],
  //           likes: []
  //         }

  //         const filename = `${req.body.firstName.substring(0,3)}-${req.body.lastName.substring(0,3)}: ${metadata.title} / ${date}`
  //         const fileInfo = {
  //           filename: filename,
  //           metadata: metadata,
  //           bucketName: 'artworks'
  //         };

  //         req.filename = filename

  //         resolve(fileInfo);

  //       } catch (error) {
  //         return reject(error)
  //       }
  //     });
  // }})

  // const store = multer({
  //   storage,
  //   limits: {fileSize: 20000000},
  //   fileFilter: function(req, file, cb){
  //     checkFileType(file, cb)
  //   }
  // })

  // const checkFileType = (file, cb) => {
  //   const filetypes = /jpeg|jpg|png|gif/
  //   const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
  //   const mimetype = filetypes.test(file.mimetype)
  //   if(mimetype && extname) return cb(null, true)
  //   cb('filetype')
  // }

  // const uploadMiddleware = (req, res, next) => {
  //   const upload = store.single('image')
  //   upload(req, res, (err) => {
  //     if(err instanceof multer.MulterError){
  //       return res.status(400).send('File too large')
  //     } else if(err){
  //       if(err === 'filetype') return res.status(400).send('Image files only')
  //       return res.sendStatus(500)
  //     }
  //     next()
  //   })
  // }

  const remove = (artId) => {
    gfs.remove({ _id: artId._id, root: 'uploads' }, (err, gridStore) => {
      if (err) {
        return res.status(404).json({ err: err });
      }
    });
  }

  // const artware = {
  //     upload: upload,
  //     remove: remove
  // }

  // module.exports = artware;

