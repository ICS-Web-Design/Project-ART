const express = require('express')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
// var multer = require('multer');
// var upload = multer();

// Connect databse
connectDB()

// Middleware
// app.use(express.json({ extended: false }))
app.use(methodOverride('_method'))

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
// for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));

app.use(cors({
    // origin: '*',
    methods: "GET,PUT,POST,DELETE"
}))

app.get('/', (req, res) => {
    res.send("API Running :)")
})

// Define Routes
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/profiles', require('./routes/api/journal'))
app.use('/api/profiles', require('./routes/api/collections'))
app.use('/api/art', require('./routes/api/art'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})