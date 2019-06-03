const express = require('express');
const passport = require('passport');
const controller = require('../controllers/auth');
const upload = require('../middleware/upload');
const router = express.Router();

// localhost:5000/api/auth/login
router.post('/login', controller.login);

// localhost:5000/api/auth/register
router.post('/register', upload.single('image'), controller.register);

//localhost:5000/api/auth/profile
router.get('/profile', passport.authenticate('jwt', {session: false}), controller.getProfile);
router.put('/profile', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.editProfile);


module.exports = router;