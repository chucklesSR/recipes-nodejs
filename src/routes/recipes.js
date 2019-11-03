const { Router } = require('express')
const router = Router()

const Recipe = require('../models/Recipe')

const { isAuthenticated } = require('../helpers/auth')

const { addRecipes, editRecipe, deleteRecipe } = require('../controllers/recipes.controller')

router.get('/recipes/add', isAuthenticated, ( req, res ) => {
    res.render('recipes/add-recipes')
})

router.post('/recipes/add', isAuthenticated, addRecipes ) 

router.get('/recipes', isAuthenticated, async ( req, res ) => {

    const recipes = await Recipe.find().sort({date: 'desc'})
    res.render('recipes/list-recipes', { recipes })

})

router.get('/recipes/:sort', isAuthenticated, async ( req, res ) => {
    let recipes = ''
    if(req.params.sort=='date'){
        recipes = await Recipe.find().sort({date: 'desc'})
    }
    else{
        recipes = await Recipe.find().sort({title: 'asc'})
    }
    res.render('recipes/list-recipes', { recipes })

})

router.post('/recipes/find', isAuthenticated, async ( req, res ) => {

    const { search } = req.body
    const recipes = await Recipe.find({title: { $regex: '.*' + search + '.*' }}).sort({date: 'desc'})
    res.render('recipes/list-recipes', { recipes } )

})

router.get('/recipes/edit/:id', isAuthenticated, async ( req, res ) =>{

    const recipe = await Recipe.findById(req.params.id)
    res.render('recipes/edit-recipes', { recipe })
})

router.put('/recipes/edit-recipe/:id', isAuthenticated, editRecipe)

router.delete('/recipes/delete/:id', isAuthenticated, deleteRecipe)

module.exports = router