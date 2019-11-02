const app = require('./app')
require('./config/database')


// Server init
const init = async () => {

    try {
        await app.listen(app.get('port'))
        console.log('server on port', app.get('port'))
    }
    catch(e){
        console.log(e)
    }

}

init()