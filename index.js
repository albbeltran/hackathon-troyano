const express = require('express')

const app = express()

const router = require('./router')

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(express.static('public'))
app.set('view engine','ejs')
// app.set('views','views')

app.use('/', router)
app.listen(3000);

//Exporting the app
module.exports = app