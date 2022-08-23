const mongoose = require('mongoose');

const userCollection= 'users'

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
})
 
module.exports = mongoose.model(userCollection,userSchema);