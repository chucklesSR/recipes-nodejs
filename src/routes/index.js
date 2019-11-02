const { Router } = require('express')
const router = Router()

router.get('/', ( req, res ) => {
    res.send('hola mundo')
})

router.get('/about', ( req, res ) => {
    res.send('about')
})

module.exports = router