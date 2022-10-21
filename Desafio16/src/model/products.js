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
    }
})

export const productsModel = mongoose.model("products", Schema);