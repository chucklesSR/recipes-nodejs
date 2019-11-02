const express = require('express')
const path = require('path')
const exhbs = require('express-handlebars')
const methodOverride = require('method-override')
const session = require('express-session')

//Initializations
const app = express()

// Settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exhbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir : path.join(app.get('views'),'partials'),
    extname: '.hbs'
}))
app.set('view engine', '.hbs')

// Middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'mysecretapp',
     resave: true,
     saveUninitialized: true
}))

//Global Variables

// Routes
app.use(require('./routes/index'))
app.use(require('./routes/users'))
app.use(require('./routes/recipes'))

// Static files
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app