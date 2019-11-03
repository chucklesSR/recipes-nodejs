const mongoose = require('mongoose')
const { Schema } = mongoose
const path = require('path')

const RecipeSchema = new Schema ({
    title: {
        type: String, 
        required: true
    },
    description: {
        type: String,
        required: true
    },
    filename: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: {
        type: Number,
        default: 0
    }
})

RecipeSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '')
    })

module.exports = mongoose.model('Recipe' , RecipeSchema)