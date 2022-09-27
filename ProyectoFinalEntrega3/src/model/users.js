import mongoose from 'mongoose';

const userCollection= 'users'

const userSchema= new mongoose.Schema({
    username:{
        type: String,
        require: true,
        index: {
            unique: true
        }
    },
    email:{
        type: String,
        require: true
    },
    password:{
        type: String,
        require: true
    },
    cart:{
        type: Array
    },
    avatar: {
        type: Buffer
    }

})

export const usersService= mongoose.model(userCollection,userSchema);