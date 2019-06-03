const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user');
const router = express.Router();

router.get('/:id', passport.authenticate('jwt', {session: false}), controller.showUser);
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteUser);

module.exports = router;