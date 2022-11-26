//const database = require('../../../../configs/mongoAtlas');
//database.connect();
const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
    id: { type: Number },
    email: { type: String },
    time_Stamp: { type: String },
    delivery_Address: { type: String },
    items: { type: Array },
    total_Price: { type: Number }
})

let instance = null

class CartDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('cart', cartSchema);
    }
    static getInstance() {
        if (!instance) instance = new CartDaoMongoAtlas();
        return instance;
    }

    async createId() {
        try {
            let id = 1;
            const carts = await this.getAllCarts();
            if (carts.length > 0) {
                const i = carts.length - 1;
                id = (carts[i].id) + 1;
            }
            return id;
        } catch (error) {
            throw error;
        }
    }

    async getAllCarts() {
        try {
            return await this.collection.find();
        } catch (error) {
            throw error;
        }
    }

    async getCartById(id) {
        try {
            return await this.collection.find({ id: id });
        } catch (error) {
            throw error;
        }
    }

    async createCart(cart) {
        try {
            const id = await this.createId();
            cart.id = id;
            const newCart = this.collection(cart);
            await newCart.save();
            return id;
        } catch (error) {
            throw error;
        }
    }

    async updateCart(cart_Id, data) {
        try {
            const result = await this.collection.updateOne({ id: cart_Id }, { $set: { items: data.items, total_Price: data.total_Price } });
            return result;
        } catch (error) {
            throw error;
        }
    }

    async deleteById(id) {
        try {
            const result = await this.collection.findOneAndDelete({ id: id });
            return result;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    CartDaoMongoAtlas
}