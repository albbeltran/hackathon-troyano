const express = require('express')

const session = require('express-session');

const app = express()

const router = require('./router')

const morgan = require('morgan');

const passport = require('passport')

//Inicialiacions
require('./database')
require('./passport/local-auth')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine', 'ejs')

// app.set('views','views')



app.set('port', process.env.PORT || 3000)

//middle ware
app.use(morgan('dev'))
app.use(passport.initialize());
app.use(session({
    secret: 'mysecretsession',
    resave: false,
    saveUninitialized: false
}));

//Manage loguin datos ((;
app.use(express.urlencoded({ extended: false }));


//Rutas
app.use('/', router)
app.listen(app.get('port'), () => {
    console.log('listening on port' + app.get('port'))

});

//Exporting the app
module.exports = app