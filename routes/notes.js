const express = require('express')
const passport = require('passport')
const controller = require('../controllers/notes')
const upload = require('../middleware/upload')
const router = express.Router()

router.get('/', passport.authenticate('jwt', {session: false}), controller.showNotesList)
router.get('/:id', passport.authenticate('jwt', {session: false}), controller.getNoteById)
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.addNewNote)
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.editNote)
router.delete('/:id', passport.authenticate('jwt', {session: false}), controller.deleteNote)

module.exports = router