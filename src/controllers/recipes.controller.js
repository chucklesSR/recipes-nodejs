const Recipe = require('../models/Recipe')
const path = require('path')
const { randomNumber } = require('../helpers/libs')
const fs = require('fs-extra')

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
            description,
        })
    }
    else{

        const saveImage = async () =>{
            const imageURL = randomNumber()
            const images = await Recipe.find({filename: imageURL})
            if(images.length > 0){
                saveImage()
            }else{
                const ext = path.extname(req.file.originalname).toLocaleLowerCase()
                const imageTempPath = req.file.path
                const targetPath = path.resolve(`src/public/upload/${imageURL}${ext}`)
                if(ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
                    await fs.rename(imageTempPath, targetPath)
                    const newRecipe = new Recipe({
                        title, 
                        description,
                        filename: imageURL + ext
                    })
                    await newRecipe.save()
                    req.flash('success_msg', 'Recipe Added Successfully')
                    res.redirect('/recipes')
                }
                else{
                    await fs.unlink(imageTempPath)
                    req.flash('error_msg', 'Only Images are allowed')
                    res.redirect('/recipes/add')
                }
            }

        }

        saveImage()

        
        
    }
        
}

const editRecipe = async ( req, res ) => {
    const { title, description } = req.body
    await Recipe.findByIdAndUpdate(req.params.id, { title, description })
    req.flash('success_msg', 'Recipe Update Successfully')
    res.redirect('/recipes')
}

const deleteRecipe = async ( req, res ) => {
    const recipe = await Recipe.findById(req.params.id)
    if(recipe){
        await fs.unlink(`src/public/upload/${recipe.filename}`)
        await Recipe.findByIdAndDelete(req.params.id)
        req.flash('success_msg', 'Recipe Delete Successfully')
        res.redirect('/recipes')
    }
}

module.exports = {
    addRecipes,
    editRecipe,
    deleteRecipe
}