import mongoose from 'mongoose';

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

export const usersService= mongoose.model(userCollection,userSchema);