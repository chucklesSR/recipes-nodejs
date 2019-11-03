const Recipe = require('../models/Recipe')

const addRecipes = async ( req, res ) => {
    const { title, description } = req.body
    const errors = []
    if(!title){
        errors.push({text: 'Please type a Title'})
    }
    if(!description){
        errors.push({text: 'Please type a Description'})
    }
    if( errors.length > 0 ) {
        res.render('recipes/add-recipes', {
            errors,
            title,
            description
        })
    }
    else{
        const newRecipe = new Recipe({title, description})
        await newRecipe.save()
        req.flash('success_msg', 'Recipe Added Successfully')
        res.redirect('/recipes')
    }
}

const editRecipe = async ( req, res ) => {
    const { title, description } = req.body
    await Recipe.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg', 'Recipe Update Successfully')
    res.redirect('/recipes')
}

const deleteRecipe = async ( req, res ) => {
    await Recipe.findByIdAndDelete(req.params.id)
    req.flash('success_msg', 'Recipe Delete Successfully')
    res.redirect('/recipes')
}

module.exports = {
    addRecipes,
    editRecipe,
    deleteRecipe
}