const mongoose = require('mongoose')
const Scema = mongoose.Schema

const noteScema = new Scema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        default: ''
    },
    //??
    _noteId: {
        type: Number,
        default: ''
    },
    date: {
        type: Date,
        default: Date.now
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Scema.Types.ObjectId
    }
})

module.exports = mongoose.model('notes', noteScema)