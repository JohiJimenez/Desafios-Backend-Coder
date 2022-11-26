const { CartService } = require('./CartService');
const cartService = new CartService(process.env.NODE_ENV);
const {logger} = require('../../utils/logger');

class CartController {

    async createCart(req, res) {
        try {
            const email = req.body.email;
            const delivery_Address = req.body.delivery_Address;
            await cartService.createCart(email, delivery_Address);
            res.status(201).send('Cart Created Successfully');
        } catch (error) {
            logger.error(error.message);
            res.render('error', {error:error.message});
        }
    }

    async getAllCarts(req, res) {
        try {
            const carts = await cartService.getAllCarts();
            res.send(carts);
        } catch (error) {
            logger.error(error.message);
            res.render('error', {error:error.message});
        }

    }

    async getCart(req, res) {
        try {
            const cart_Id = req.user.cart_Id;
            const cart = await cartService.getCartById(cart_Id);;
            const total_Price = cart.total_Price;
            const products = cart.items;
            res.render('cart', { total_Price, products: products });
        } catch (error) {
            logger.error(error.message);
            res.render('error', {error:error.message});
        }
    }

    async addProductToCart(req, res) {
        try {
            const cart_Id = req.user.cart_Id;
            const product_Id = req.params.id;
            const quantity = req.body.quantity;
            await cartService.addProductToCart(cart_Id, product_Id, quantity);
            res.redirect('/cart');
        } catch (error) {
            logger.error(error.message);
            res.render('error', {error:error.message});
        }
    }

    async removeProductosFormCart(req, res) {
        try {
            const product_id = req.params.id;
            const cart_id = req.user.cart_Id;
            await cartService.removeProductFromCartById(product_id, cart_id);
            res.status(200).redirect('/cart');
        } catch (error) {
            logger.error(error.message);
            res.render('error', {error:error.message});
        }
    }
}

module.exports = {
    CartController
}