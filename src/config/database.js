const mongoose = require('mongoose')

const conn = async() => {

    try{
        await mongoose.connect( process.env.DATABASE || 'mongodb://localhost/recipes',{
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: true
        })
        console.log('database is connected')
    }
    catch(e){
        console.log(e)
    }
}

conn()