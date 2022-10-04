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
    email:{
        type: String,
        require: true
    },
})

export const usersModel= mongoose.model(userCollection,userSchema);