const { UserDaoFactory } = require("./persistence/UserDaoFactory");
const { CartService } = require("../cart/CartService");
const bcrypt = require('bcrypt');
const {sendEmailNewUser} = require('../../utils/nodemailer');
const {logger} = require('../../utils/logger');


class UserService {
    constructor(type) {
        this.dao = new UserDaoFactory().getDao(type);
        this.cartService = new CartService(process.env.NODE_ENV);
    }

    async checkExistingUser(email){
        try {
            const userFound = await this.dao.findUser(email);
            if(userFound !== undefined) throw new Error('Usuario Existente');
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    checkValidFields(user){
        if(user.email === undefined || user.email === '' || user.password === undefined || user.password === '' || user.name === undefined || user.name === '' || user.address === undefined || user.address === '' || user.telephone === undefined || user.telephone === ''){
            throw new Error('Algun campo esta vacio o es invalido');
        }
    }

    async saveNewUser(user) {
        try {
            this.checkValidFields(user);
            await this.checkExistingUser(user.email);
            const encryptedPassword = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10));
            user.password = encryptedPassword;
            const createCartId = await this.cartService.createCart(user.email,user.address);
            user.cart_Id = createCartId;
            user.admin = false;
            sendEmailNewUser(process.env.ADMIN_EMAIL,process.env.RECEIVER_EMAIL,user);
            const newUser = await this.dao.saveNewUser(user);
            return newUser;
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async findUser(email){
        try {
            return await this.dao.findUser(email);
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }

    async updateCartId(user_Id,newCartId){
        try {
            await this.dao.updateCartId(user_Id,newCartId);
        } catch (error) {
            logger.error(error.message);
            throw error;
        }
    }
}

module.exports = {
    UserService
}