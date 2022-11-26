//const database = require('../../../../configs/mongoAtlas');
//database.connect();
const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
    order_Number: { type: Number },
    items: { type: Array },
    time_Stamp: { type: String },
    state: { type: String },
    email: { type: String },
    delivery_Address: { type: String },
    total_Price: { type: Number }
})

let instance = null;


class OrdersDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('orders', ordersSchema);
    }
    static getInstance() {
        if (!instance) instance = new OrdersDaoMongoAtlas();
        return instance;
    }

    async createOrderNumber() {
        try {
            let orderNumber = 1;
            const orders = await this.getAllOrders();
            if (orders.length > 0) {
                const i = orders.length - 1;
                orderNumber = (orders[i].order_Number) + 1;
            }
            return orderNumber;
        } catch (error) {
            throw error;
        }
    }

    async createNewOrder(order) {
        try {
            const orderNumber = await this.createOrderNumber();
            order.order_Number = orderNumber;
            const newOrder = new this.collection(order);
            newOrder.save();
            return orderNumber;
        } catch (error) {
            throw error;
        }
    }

    async getAllOrders() {
        try {
            return await this.collection.find();
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    OrdersDaoMongoAtlas
}