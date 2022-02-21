const mongoose = require('mongoose')
const config = require('config')
const db = config.get("mongoURI")

const connectDB = async () => {
    try{
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 300000
        })
        console.log("MongoDB Connected :)))")
    } catch(err) {
        console.error(err)
        process.exit(1)         // Exit process with failure
    }
}

module.exports = connectDB

