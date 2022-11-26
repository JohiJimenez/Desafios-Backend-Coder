const { ProductDaoFactory } = require("./persistence/ProductDaoFactory");
const mongoose = require('mongoose');

class ProductService {
    constructor(type) {
        this.dao = new ProductDaoFactory().getDao(type);
    }

    checkValidFields(product) {
        if (product.title === undefined || product.title === '' || product.price === undefined || product.price === '' || product.category === undefined || product.category === '' || product.description === undefined || product.description === '' || product.thumbnail === undefined || product.thumbnail === '') {
            throw new Error('Algun campo esta vacio o es invalido');
        }
    }

    async checkExistingProduct(id) {
        const product = await this.getProductsById(id);
        if (!product) {
            throw new Error('El Id ingresado no corresponde a un producto existente');
        }
    }

    async getProducts(id) {
        try {
            if (id) {
                if(!mongoose.isValidObjectId(id)) throw new Error('El Id ingresado es invalido');
                const product = await this.dao.getProductsBy_Id(id);
                if(product.length < 1) throw new Error('El Id ingresado no corresponde a un producto existente');
                return product
            }
            return await this.dao.getAllProducts();
        } catch (error) {
            throw error;
        }
    }

    async getProductsById(id) {
        try {
            return (await this.dao.getProductsById(id))[0];
        } catch (error) {
            throw error;
        }
    }

    async getByCategory(category) {
        try {
            return await this.dao.getProductsByCategory(category);
        } catch (error) {
            throw error;
        }
    }

    async createProduct(product) {
        try {
            this.checkValidFields(product);
            await this.dao.createProduct(product);
        } catch (error) {
            throw error;
        }

    }

    async updateProductById(id, product) {
        try {
            this.checkValidFields(product);
            this.checkExistingProduct(id);
            return await this.dao.updateProductById(id, product);
        } catch (error) {
            throw error;
        }
    }

    async deleteProductById(id) {
        try {
            this.checkExistingProduct(id);
            return await this.dao.deleteProductById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    ProductService
}