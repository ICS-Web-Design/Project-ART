const express = require('express')
const connectDB = require('./config/db')
const methodOverride = require('method-override')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

// Connect databse
connectDB()

// Middleware
app.use(express.json({ extended: false }))
app.use(methodOverride('_method'))
app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send("API Running :)")
})

// Define Routes
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/profiles', require('./routes/api/journal'))
app.use('/api/profiles', require('./routes/api/collections'))
app.use('/api/profiles', require('./routes/api/art'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})