const mongoose = require('mongoose')
const { Schema } = mongoose

const bookSchema = new Schema({
    title: {
        type: String,
        required: [true,'you should input the title']
    },
    author: {
        type: String,
        required: [true, 'you should input the author']
    },
    description: {
        type: String,
        require: [true, 'you should input the description']
    },
    image: {
        type: String,
        default: 'http://ppc.tools/wp-content/themes/ppctools/img/no-thumbnail.jpg'
    },
    publisher: {
        type:String,
        required: [true, 'you should input the publisher']
    },
    reviewsId: [{
        type: Schema.Types.ObjectId,
        ref: 'review'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    }
}, {
        timestamps: true
    })

const book = mongoose.model('book', bookSchema)

module.exports = book