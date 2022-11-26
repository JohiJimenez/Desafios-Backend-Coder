const chatRouter = require('express').Router();

const {authenticateToken} = require('../../middlewares/auth');
const {ChatController} = require('./ChatController');
const chatController =  new ChatController();


chatRouter.get('/',authenticateToken,chatController.handlerChat);
chatRouter.get('/:email',authenticateToken,chatController.getOwnMessages);

module.exports = {
    chatRouter
}