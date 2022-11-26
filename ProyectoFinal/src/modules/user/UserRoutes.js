const userRouter = require('express').Router();
const {UserController} = require('./UserController');
const userController = new UserController();
const {authenticationCheck, authenticateToken} = require('../../middlewares/auth');

userRouter.get('/',authenticateToken,userController.rootHandler);
userRouter.get('/login',authenticateToken,userController.renderLogin);
userRouter.get('/signin',authenticateToken,userController.renderSignIn);
userRouter.get('/logout',authenticateToken,userController.logoutHandler);

userRouter.post('/signin',userController.saveNewUser);
userRouter.post('/login',authenticationCheck,userController.loginHandler);

module.exports = {
    userRouter
}