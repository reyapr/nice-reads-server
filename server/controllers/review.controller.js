const mongoose = require('mongoose')
const User = require('../models/user.model')
const Book = require('../models/book.model')
const Review = require('../models/review.model')

module.exports = {
    addReview(req, res) {
        const userId = req.headers.decoded.id
        const bookId = req.params.bookId
        const { content } = req.body
        console.log(content)
        Review.create({
            content,
            userId,
            bookId
        })
            .then(result => {
                console.log(result)
                Book.findByIdAndUpdate({ _id: req.params.bookId }, {
                    $push: {
                        reviewsId: result._id
                    }
                }).then(result => {
                    res.status(200).json({
                        message: 'success to add review',
                        result
                    })
                }).catch(err => {
                    res.status(400).json({
                        message: 'can\'t to add review',
                        err
                    })
                })
            }).catch(err => {
                res.status(400).json({
                    message: 'can\'t to add review',
                    err
                })
            })

    },
    deleteReview(req, res) {
        const id = req.params.reviewId
        Review.findByIdAndRemove(id)
            .then((result) => {
                Book.findByIdAndUpdate(result.bookId,{
                    $pull: {
                        reviewsId:result._id
                    }
                }).then(result=>{
                    res.status(200).json({
                        message:'success to delete',
                        result
                    })
                })
            }).catch((err) => {
                res.status(400).json({
                    message: 'failed',
                    err
                })
            });
    },
}