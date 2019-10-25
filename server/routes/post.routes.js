const passport = require('passport')
const {Router} = require('express')
const upload = require('../middleware/upload')
const ctr = require('../controllers/post.controller')
const router = Router()


router.post(
  '/',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  ctr.create
)

router.get(
  '/',
  ctr.getAll
)

router.get(
  '/pagination/:page',
  ctr.getByPageNumber
)

router.get(
  '/category/:id',
  ctr.getByCategory
)

router.get(
  '/:id',
  ctr.getById
)

router.get(
  '/single/:slug',
  ctr.getBySlug
)

router.put(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  upload.single('image'),
  ctr.update
)

router.delete(
  '/:id',
  passport.authenticate('jwt', {session: false}),
  ctr.remove
)

module.exports = router
