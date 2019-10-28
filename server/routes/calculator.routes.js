const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/calculator.controller')
const router = Router()


router.post(
    '/',
    passport.authenticate('jwt', {session: false}),
    upload.single('file'),
    ctr.uploadXlsTable
)

router.get(
    '/:title',
    ctr.getJsonData
)

module.exports = router
