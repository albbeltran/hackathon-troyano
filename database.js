const mongoose = require('mongoose');
const { mongodb } = require('./keys');



mongoose.connect(mongodb.URI, {})
    .then(db => console.log('DB contctadfa'))
    .catch(err => console.error(err));