const express = require('express')
const controller = require('../controllers/profile')
const router = express.Router()

router.get('/', controller.getProfileByUserId)
router.patch('/', controller.getProfileByUserId)

module.exports = router