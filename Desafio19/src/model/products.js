import mongoose from "mongoose";

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        max: 100
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true,
        max: 6,
        unique: true
    }
})

export const productsModel = mongoose.model("products", Schema);