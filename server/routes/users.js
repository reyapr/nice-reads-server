var express = require('express');
var router = express.Router();

const {
  signup,
  signin,
  fbLogin,
} = require('../controllers/user.controller')

router.post('/signin', signin)
router.post('/signup', signup)
router.post('/fblogin', fbLogin)

module.exports = router;
