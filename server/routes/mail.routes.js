const express = require('express')
const ctr = require('../controllers/mail.controller')
const router = express.Router()

router.post('/callback', ctr.sendCallbackMail)
router.post('/calculation', ctr.sendCalculation)

module.exports = router