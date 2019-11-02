const { Router } = require('express')
const router = Router()

router.get('/users/login', ( req, res ) => {
    res.send('login')
})

router.get('/users/signup', ( req, res ) => {
    res.send('signup')
})

module.exports = router