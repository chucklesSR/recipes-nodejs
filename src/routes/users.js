const { Router } = require('express')
const router = Router()

const passport = require('passport')

const { signup } = require('../controllers/users.controller')

router.get('/users/login', ( req, res ) => {
    res.render('users/login')
})

router.post('/users/login', passport.authenticate('local', {
    successRedirect: '/recipes',
    failureRedirect: '/users/login',
    failureFlash: true
}))

router.get('/users/signup', ( req, res ) => {
    res.render('users/signup')
})

router.post('/users/signup', signup)

router.get('/users/logout', (req, res) =>{
    req.logOut()
    res.redirect('/')
})

module.exports = router