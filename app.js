const express = require('express')
const session = require('express-session')
const MongoStore = require('connect-mongo')
const flash = require('connect-flash')

const app = express()

let sessionOptions = session({
    secret: process.env.SESSIONSECRET,
    //store session data in mongodb
    store: MongoStore.create({client: require('./db')}),
    resave: false,
    saveUninitialized: false,
    //Set 24 hour cookie duration
    cookie: {maxAge: 1000 * 60 * 60 * 24, httpOnly: true}
})

app.use(sessionOptions)
app.use(flash())

const router = require('./router')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine','ejs')
// app.set('views','views')

app.use('/', router)

//Exporting the app
module.exports = app