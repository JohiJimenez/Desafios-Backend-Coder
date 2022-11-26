const {OrdersService} = require('./OrdersService');
const ordersService = new OrdersService(process.env.NODE_ENV);
const {logger} = require('../../utils/logger');

class OrdersController{

    async createNewOrder(req,res){
        try {
            const user = req.user;
            const id_Cart = await ordersService.createNewOrder(user);
            req.user.cart_Id = id_Cart;
            res.redirect('/cart');
        } catch (error) {
            logger.error(error.message)
            res.render('error', {error:error.message});
        }
    }
}

module.exports = {
    OrdersController
}