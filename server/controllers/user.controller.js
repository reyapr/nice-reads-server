const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model')
const FB = require('fb')

const user = process.env.EMAIL
const pass = process.env.PASS


module.exports = {
    homePage(req, res, next) {
        res.send('home')
    },
    signup(req, res, next) {
        let { name, email, password, role } = req.body
        User.create({
            name,
            email,
            password,
            role
        })
            .then(success => {
                res.status(200).json({
                    message: 'created account success',
                    name,
                    email,
                })
            })
            .catch(err => {
                if (err.msg) {
                    return res.status(400).json({
                        err
                    })
                }
                let message = err.message.substr(30)
                if (message.substr(0, 3) == 'ion') {
                    message = 'Email Already Registered'
                }
                res.status(400).json({
                    message
                })

            })
    },

    signin(req, res, next) {
        let { email, password, role } = req.body
        let salt = bcrypt.genSaltSync()
        User.findOne({
            email
        }).then(user => {
            return bcrypt.compare(password, user.password, function (err, match) {
                if (match) {
                    let key = process.env.SECRET_KEY
                    let token = jwt.sign({
                        id: user._id,
                        email: user.email,
                        role: user.role
                    }, key)
                    return res.status(200).json({
                        message: 'success to login',
                        user,
                        token
                    })
                }
                res.status(400).json({ message: 'wrong password' })
            })

        }).catch(err => {
            res.status(400).json({
                message: 'username or password wrong'
            })
        })
    },
    deleteUser(req, res, next) {
        User.findByIdAndRemove(req.params.id)
            .exec()
            .then(user => {
                Todo.deleteMany({ userId: user._id })
                    .exec()
                    .then(todo => {
                        res.status(200).json({
                            message: 'success to delete account',
                            user
                        })
                    })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'failed to delete account',
                    err: error
                })
            })
    },
    updateUser(req, res, next) {
        User.findByIdAndUpdate(req.params.decoded.id, req.body)
            .exec()
            .then(user => {
                res.status(200).json({
                    message: 'success to update account',
                    user
                })
            })
            .catch(error => {
                res.status(400).json({
                    message: 'failed to update account',
                    err: error
                })
            })
    },
    fbLogin(req, res, next) {
        FB.setAccessToken(req.headers.fbtoken)
        FB.api('/me', {
            fields: ['name', 'email', 'picture']
        }).then(response => {
            const { name, email, picture } = response
            User.findOne({ email })
                .then(getUser => {
                    let key = process.env.SECRET_KEY
                    let image = picture.data.url
                    if (getUser) {
                        console.log('masuk')
                        let role = getUser.role
                        let token = jwt.sign({
                            id: getUser._id,
                            name,
                            email,
                            role: 'user'
                        }, key)

                        res.status(200).json({
                            message: 'success login with facebook',
                            token,
                            role,
                            image,
                            name
                        })
                    } else {
                        User.create({
                            name,
                            email,
                            password: 'hacktiv8student',
                            role: 'user'
                        }).then(createdUser => {
                            let role = createdUser.role
                            let key = process.env.SECRET_KEY
                            let token = jwt.sign({
                                id: createdUser._id,
                                name,
                                email,
                                role: createdUser.role
                            }, key)
                            res.status(200).json({
                                message: 'success login with facebook',
                                token,
                                role,
                                image,
                                name
                            })
                        })
                            .catch(err => {
                                console.log(err)
                                res.status(400).json({
                                    message: err.message
                                })
                            })
                    }
                })
                .catch(err => {
                    console.log(err)
                    res.status(400).json({
                        message: err.message
                    })
                })
        }).catch(err => {
            console.log(err)
            res.status(400).json({
                message: err.message
            })
        })
    }
}