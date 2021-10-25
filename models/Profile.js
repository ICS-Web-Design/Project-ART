const mongoose = require('mongoose')


const ProfileSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    grade: {
        type: Number,
        required: true,
    },
    journals: [],
    artworks: [],
    collections: []
})

module.exports = Profile = mongoose.model('profile', ProfileSchema)