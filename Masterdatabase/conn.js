const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/MasterDB');

const dbobject = mongoose.connection

dbobject.on('connected' , ()=>{console.log('Mongo DB Connection Successfully')})
dbobject.on('error' , ()=>{console.log('Mongo DB Connection Failed')})

module.exports = mongoose