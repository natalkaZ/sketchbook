const mongoose = require('mongoose')
const Scema = mongoose.Schema

const UserScema = new Scema({
    name: {
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
    phone: {
        type: Number,
        required: true
    },
    avatarSrc: {
        type: String,
        default: ''
    }
    // notesList: [
    //     {
    //         name: {
    //             type: String
    //         },
    //         decription:{
    //             type: String
    //         },
    //         date:{
    //             type: Date
    //         }
    //     }
    // ]

})

module.exports = mongoose.model('users', UserScema)