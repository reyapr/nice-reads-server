const User = require('../models/user.model')
const Book = require('../models/book.model')
const Review = require('../models/review.model')

module.exports = {
  addBook(req, res) {
    const userId = req.headers.decoded.id
    const { title, author, publisher,description,imgUrl} = req.body
    Book.create({ 
      title, 
      author, 
      publisher,
      description,
      image:imgUrl,
      userId
    }).then((result) => {
        User.findByIdAndUpdate(result.userId, {
          $push: {
            booksId: result._id
          }
        })
          .then(user => {
            res.status(200).json({
              message: 'success to add book',
              result
            })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed to add book',
          err
        })
      });
  },
  showBooks(req, res) {
    Book.find()
      .populate('user')
      .populate({
        path: 'commentsId',
        populate:{path:'user'}
      })
      .then((result) => {

        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  findBook(req, res) {
    Book.findById(req.params.bookId)
      .populate('reviewsId')
      .populate('userId')
      .then((result) => {
        console.log(result)
        
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  userBook(req, res) {
    const user = req.headers.decoded.id
    Book.find({
      user
    })
      .populate('user')
      .populate({
        path: 'commentsId',
        populate: {
          path: 'user'
        }
      })
      .then((result) => {
        res.status(200).json({
          message: 'success',
          result
        })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed',
          err
        })
      });
  },
  deleteBook(req, res) {
      console.log(req.params.bookId)
      Book.findByIdAndRemove(req.params.bookId)
      .then((result) => {
        User.findByIdAndUpdate(result.userId, {
          $pull: {
            booksId: result._id
          }
        })
          .then(user => {
              console.log(user)
            Review.deleteMany({
              booksId: req.params.bookId
            })
              .exec()
              .then(answer => {
                res.status(200).json({
                  message: 'success to delete book',
                  answer
                })
              })
          })
      }).catch((err) => {
        res.status(400).json({
          message: 'failed to delete book',
          err
        })
      });
  },
}