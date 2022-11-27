const cartRouter = require('express').Router();
const {CartController} = require('./CartController');
const {isAdmin,authenticateToken} = require('../../middlewares/auth');
const cartController = new CartController();

cartRouter.get('/',authenticateToken,cartController.getCart);

cartRouter.post('/',authenticateToken,cartController.createCart);
cartRouter.post('/:id',authenticateToken,cartController.addProductToCart);
cartRouter.post('/delete/:id',authenticateToken,cartController.removeProductsFormCart);

cartRouter.delete('/delete/:id',authenticateToken,cartController.removeProductsFormCart);


module.exports = {
    cartRouter
}