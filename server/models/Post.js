const {Schema, model} = require('mongoose')


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category'
    }],
    imageUrl: String,
    text: String,
    description: String
})

module.exports = model('Post', postSchema)