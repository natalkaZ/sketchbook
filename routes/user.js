const express = require('express')
const controller = require('../controllers/user')
const router = express.Router()

router.get('/:id', controller.showUser)
router.delete('/:id', controller.deleteUser)

module.exports = router