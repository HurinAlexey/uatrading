const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const keys = require('./keys')


mongoose.connect(keys.MONGO_URI, {useNewUrlParser: true})
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err))

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

module.exports = app