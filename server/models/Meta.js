const {Schema, model} = require('mongoose')


const metaSchema = new Schema({
    page: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    keywords: {
        type: String,
        required: false
    }
})

module.exports = model('Meta', metaSchema)