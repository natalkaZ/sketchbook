const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.login = async function (req, res) {
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        //check password, user exist
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
        if (passwordResult) {
            //generate token, passwords matched
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id,
                name: candidate.name,
                phone: candidate.phone,
                avatarSrc: candidate.avatarSrc
            }, keys.jwt, { expiresIn: 60 * 60 });
            res.status(200).json({
                token: `Bearer ${token}`
            });
        } else {
            //if password don't matches
            res.status(401).json({
                message: "Password don't match. Try again!"
            });
        }
    } else {
        //user don't exist, error
        res.status(404).json({
            message: "User with this email don't found!"
        });
    }
};

module.exports.register = async function (req, res) {
    //email, password
    const candidate = await User.findOne({ email: req.body.email });

    if (candidate) {
        //user exist, return error
        res.status(409).json({
            message: 'This email already taken. Try something another.'
        });
    } else {
        //create new user
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        // const hash = bcrypt.hashSync(password, salt);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            phone: req.body.phone,
            avatarSrc: req.file ? req.file.path : ''
            // notesList: req.body.notesList
        });

        //for catch error
        try {
            await user.save();
            res.status(201).json(user);
        } catch (e) {
            //do smth with error
            errorHandler(res, e);
        }
    }

};

getToken = function (headers) {
    if (headers && headers.authorization) {
        var parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports.getProfile = async function (req, res) {
    try {

        let token = getToken(req.headers);

        if (token) {

            let decoded = jwt.decode(token, keys.jwt);

            await User.findOne({ email: decoded.email },
                function (err, user) {
                    if (err) throw err;

                    if (!user) {
                        return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                    } else {

                        //CUSTOMIZE DATA TO RETURN ***
                        const data = {
                            userId: user._id,
                            name: user.name,
                            email: user.email,
                            phone: user.phone,
                            avatarSrc: user.avatarSrc
                        };

                        res.json(data);
                    }
                });

        } else {
            return res.status(403).send({ success: false, message: 'No token provided.' });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};

module.exports.editProfile = async function (req, res) {
    try {

        let token = getToken(req.headers);

        if (token) {

            let decoded = jwt.decode(token, keys.jwt);

            const updeted = {
                name: req.body.name,
                phone: req.body.phone,
                avatarSrc: req.file ? req.file.path : decoded.avatarSrc
            };

            console.log('updeted', updeted)

            await User.findOneAndUpdate(
                { email: decoded.email },
                { $set: updeted },
                { new: true },

                function (err, user) {
                    if (err) throw err;

                    if (!user) {
                        return res.status(403).send({ success: false, msg: 'Authentication failed. User not found.' });
                    } else {

                        const token = jwt.sign({
                            email: user.email,
                            userId: user._id,
                            name: user.name,
                            phone: user.phone,
                            avatarSrc: updeted.avatarSrc.length > 1 ? updeted.avatarSrc : decoded.avatarSrc
                        }, keys.jwt, { expiresIn: 60 * 60 });
                        res.status(200).json({
                            token: `Bearer ${token}`,
                            user: user
                        });

                    }
                });

        } else {
            return res.status(403).send({ success: false, message: 'No token provided.' });
        }
    } catch (e) {
        errorHandler(res, e);
    }
};