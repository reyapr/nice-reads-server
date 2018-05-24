const mongoose = require('mongoose')
const { Schema } = mongoose

const reviewSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'user',
    },
    content: {
        type: String,
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        ref: 'book'
    },

}, {
        timestamps: true
    })

const review = mongoose.model('review', reviewSchema)

module.exports = review

