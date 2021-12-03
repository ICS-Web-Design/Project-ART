const express = require('express')
const connectDB = require('./config/db')

const app = express()

// Connect databse
connectDB()

// Middleware
app.use(express.json({ extended: false }))

app.get('/', (req, res) => {
    res.send("API Running :)")
})

// Define Routes
app.use('/api/profiles', require('./routes/api/profiles'))
app.use('/api/profiles', require('./routes/api/journal'))
app.use('/api/profiles', require('./routes/api/collections'))

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`)
})