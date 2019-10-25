const {Schema, model} = require('mongoose')


const optionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: String,
        required: true
    }
})

module.exports = model('Option', optionSchema)