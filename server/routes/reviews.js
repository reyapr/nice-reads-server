const express = require('express')
const router = express.Router()
const {
    addReview,
    deleteReview,
} = require('../controllers/review.controller')

const {
    authentication,
} = require('../middlewares/auth')

router.post('/:bookId', authentication, addReview)
router.delete('/:reviewId', authentication, deleteReview)


module.exports = router
