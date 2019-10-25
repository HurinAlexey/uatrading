const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')
const passportStrategy = require('./middleware/passport-strategy')
const authRoutes = require('./routes/auth.routes')
const optionRoutes = require('./routes/option.routes')
const postRoutes = require('./routes/post.routes')
const categoryRoutes = require('./routes/category.routes')
const metaRoutes = require('./routes/meta.routes')
const mailRoutes = require('./routes/mail.routes')
const keys = require('./keys')

const app = express()


mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true, useFindAndModify: false})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

app.use(passport.initialize())
passport.use(passportStrategy)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/auth', authRoutes)
app.use('/api/option', optionRoutes)
app.use('/api/post', postRoutes)
app.use('/api/category', categoryRoutes)
app.use('/api/meta', metaRoutes)
app.use('/api/mail', mailRoutes)

module.exports = app