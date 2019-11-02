const mongoose = require('mongoose')

const conn = async() => {

    try{
        await mongoose.connect('mongodb://localhost/recipes',{
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
        console.log('database is connected')
    }
    catch(e){
        console.log(e)
    }
}

conn()