const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler')

module.exports.login = async function(req, res) {
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        //check password, user exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //generate token, passwords matched

            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id

            }, keys.jwt, {expiresIn: 60 * 60})
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //if password don't matches
            res.status(401).json({
                message: "Password don't match. Try again"
            })
        }
    } else{
        //user don't exist, error
        res.status(404).json({
            message: "User with this email don't found"
        })
    }
}

module.exports.register = async function(req, res) {
    //email, password
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //user exist, return error
        res.status(409).json({
            message: 'This email already taken. Try something another.'
        })
    } else {
        //create new user
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            phone: req.body.phone,
            avatarSrc: req.body.avatarSrc
            // notesList: req.body.notesList
        })

        //for catch error
        try{
            await user.save()
            res.status(201).json(user)
        } catch(e){
            //do smth with error
            errorHandler(res, e)
        }
       
    }
    

}