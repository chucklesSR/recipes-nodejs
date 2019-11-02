const { Router } = require('express')
const router = Router()

router.get('/recipes', ( req, res ) => {
    res.send('recipes')
})

module.exports = router