const { authenticateToken } = require('../../middlewares/auth');
const { OrdersController } = require('./OrdersController');
const ordersController = new OrdersController();

const ordersRouter = require('express').Router();

ordersRouter.post('/buy',authenticateToken,ordersController.createNewOrder,authenticateToken);

module.exports = {
    ordersRouter
}