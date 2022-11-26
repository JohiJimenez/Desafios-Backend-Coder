const mongoose = require('mongoose');
//const database = require('../../../../configs/mongoAtlas');
//database.connect();

const productSchema = new mongoose.Schema({
    //id: { type: Number },
    title: { type: String },
    price: { type: Number },
    category: { type: String },
    description: { type: String },
    thumbnail: { type: String }
});

let instance = null;

class ProductDaoMongoAtlas {
    constructor() {
        this.collection = mongoose.model('products', productSchema);
    }

    static getInstance() {
        if (!instance) instance = new ProductDaoMongoAtlas();
        return instance;
    }

    async createId() {
        try {
            let id = 1;
            const products = await this.getAllProducts();
            if (products.length > 0) {
                const i = products.length - 1;
                id = (products[i].id) + 1;
            }
            return id;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }


    async createProduct(productToAdd) {
        try {
            productToAdd.id = await this.createId();
            const newProduct = this.collection(productToAdd);
            await newProduct.save();
        } catch (error) {
            throw error;
        }
    }

    async getAllProducts() {
        try {
            return await this.collection.find();
        } catch (error) {
            throw error;
        }
    }

    async getProductsBy_Id(id) {
        try {
            const _id = mongoose.Types.ObjectId(id);
            return await this.collection.find({ _id: _id });
        } catch (error) {
            throw error;
        }
    }

    async getProductsByCategory(category) {
        try {
            return await this.collection.find({ category: category });
        } catch (error) {
            throw error;
        }
    }

    async getProductsById(id) {
        try {
            return await this.collection.find({ id: id });
        } catch (error) {
            throw error;
        }
    }

    async updateProductById(id, product) {
        try {
            const updateProduct = await this.collection.updateOne({ id: id }, { $set: { title: product.title, price: product.price, code: product.code, description: product.description, stock: product.stock } });;
            return updateProduct;
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            const deleteProduct = await this.collection.findOneAndDelete({ id: id });
            return deleteProduct;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    ProductDaoMongoAtlas
}