var express = require('express');
var router = express.Router();

const {
    authentication,
    authorization
} = require('../middlewares/auth')

const {
    addBook,
    showBooks,
    findBook,
    editBook,
    deleteBook,
    userBook,
    upVote,
    downVote
} = require('../controllers/book.controller')

const upload = require('../middlewares/images')

router.post('/', authentication, upload.multer.single('image'), upload.sendUploadToGCS, addBook)
router.get('/', showBooks)
router.get('/user', authentication, userBook)
router.get('/:bookId', findBook)
router.delete('/:bookId', authentication, deleteBook)

module.exports = router

