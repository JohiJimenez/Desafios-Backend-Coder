const mongoose = require('mongoose');
//const database = require('../../../../configs/mongoAtlas');
//database.connect();

const userSchema = new mongoose.Schema({
    email: { type: String },
    password: { type: String },
    name: { type: String },
    address: { type: String },
    //id: { type: Number },
    admin: { type: Boolean },
    cart_Id: { type: Number }
});

let instance = null;

class UserDaoMongoAtlas {
    constructor() {
        this.collection = new mongoose.model('Usuarios', userSchema);
    }

    static getInstance() {
        if (!instance) instance = new UserDaoMongoAtlas();
        return instance;
    }

    async createId() {
        try {
            let id = 1;
            const users = await this.getAllUsers();
            if (users.length > 0) {
                const i = users.length - 1;
                id = (users[i].id) + 1;
            }
            return id;
        } catch (error) {
            throw error;
        }
    }

    async saveNewUser(user) {
        try {
            user.id = await this.createId();
            const newUser = this.collection(user);
            const result = await newUser.save();
            return result;
        } catch (error) {
            throw error;
        }
    }

    async getAllUsers() {
        try {
            return await this.collection.find();
        } catch (error) {
            throw error;
        }
    }

    async findUser(email) {
        try {
            return (await this.collection.find({ email: email }))[0];
        } catch (error) {
            throw error;
        }
    }

    async updateCartId(user_Id, newCart_Id) {
        try {
            const result = await this.collection.updateOne({ id: user_Id }, { $set: { cart_Id: newCart_Id } });
            return result
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    UserDaoMongoAtlas
}