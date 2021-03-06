const passport = require('passport')
const {Router} = require('express')
const ctr = require('../controllers/category.controller')
const router = Router()


router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  ctr.create
)

router.get(
  '/',
  ctr.getAll
)

router.get(
  '/:id',
  ctr.getById
)

router.put(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.update
)

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

module.exports = router
