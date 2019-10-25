const {Schema, model} = require('mongoose')


const postSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
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
    order: {
        type: Number,
        default: 0
    },
    imageUrl: String,
    text: String,
    description: String,
    metaTitle: String,
    metaDescription: String,
    keywords: String
})

module.exports = model('Post', postSchema)