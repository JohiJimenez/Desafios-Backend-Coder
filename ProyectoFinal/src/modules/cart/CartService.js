const { ProductService } = require("../products/ProductService");
const { CartDaoFactory } = require("./persistence/CartDaoFactory");

class CartService {
    constructor(type) {
        this.dao = new CartDaoFactory().getDao(type);
        this.productService = new ProductService(process.env.NODE_ENV);
    }



    async checkExistingProductInCart(cart_Id,product_Id){
        try {
            const cart = await this.getCartById(cart_Id);
            if(!cart) throw new Error('Cart not Exists');
            const find = cart.items.find((item)=> item.id == product_Id);
            if(find)throw new Error('Product is already in the cart');
            return cart;
        } catch (error) {
            throw error
        }
    }

    async createCart(email, delivery_Address) {
        try {
            let cartToCreate = {
                email: email,
                delivery_Address: delivery_Address,
                items: [],
                time_Stamp: new Date().toISOString(),
                total_Price: 0
            }
            const idCart = await this.dao.createCart(cartToCreate);
            return idCart;
        } catch (error) {
            throw error
        }

    }

    async getAllCarts() {
        try {
            return await this.dao.getAllCarts();
        } catch (error) {
            throw error;
        }

    }

    async getCartById(id) {
        try {
            return (await this.dao.getCartById(id))[0];
        } catch (error) {
            throw error;
        }
    }

    async addProductToCart(cart_Id, product_Id, quantity) {
        try {
            const cartToUpdate = await this.checkExistingProductInCart(cart_Id,product_Id);
            const product = await this.productService.getProductsById(product_Id);
            if (!product) throw new Error('Product not Exist');
            if (quantity === undefined || quantity === '' || quantity == 0 || quantity < 0) throw new Error('Invalid Quantity');
            const { _id, id, title, price, category, description, thumbnail } = product
            const productToAdd = {
                _id, id, title, price, category, description, thumbnail, quantity
            }
            cartToUpdate.items.push(productToAdd);
            cartToUpdate.total_Price = (cartToUpdate.items.reduce((accum, item) => accum += item.price * item.quantity, 0)).toFixed(2);
            await this.dao.updateCart(cart_Id, cartToUpdate);
        } catch (error) {
            console.log(error);
            throw error;
         
        }
    }

    async removeProductFromCartById(product_Id, cart_Id) {
        try {
            const cart = await this.getCartById(cart_Id);
            if(!cart) throw new Error('Cart not Exist');
            const modifiedItems = cart.items.filter((item) => item.id != parseInt(product_Id));
            cart.items = modifiedItems;
            cart.total_Price = (cart.items.reduce((accum, item) => accum += item.price * item.quantity, 0)).toFixed(2);
            return await this.dao.updateCart(cart_Id, cart);
        } catch (error) {
            throw error;
        }
    }

    async deleteCartById(id) {
        try {
            return await this.dao.deleteById(id);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = {
    CartService
}