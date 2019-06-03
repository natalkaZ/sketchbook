const mongoose = require('mongoose')
const Scema = mongoose.Schema

const UserScema = new Scema({
    // userId: {
    //     type: Number,
    //     default: ''
    // },
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

UserScema.methods.toAuthJSON = function(){
    return {
        name: this.name,
        email: this.email,
        phone: this.phone,
        avatarSrc: this.avatarSrc
    };
};

module.exports = mongoose.model('users', UserScema)