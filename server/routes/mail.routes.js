const express = require('express')
const ctr = require('../controllers/mail.controller')
const router = express.Router()

router.post('/', ctr.send)

module.exports = router