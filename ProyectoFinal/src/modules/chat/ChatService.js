const { ChatDaoFactory } = require("./persistence/ChatDaoFactory");

class ChatService{
    constructor(type){
        this.dao = new ChatDaoFactory().getDao(type);
    }

    async addMessage(message){
        try {
            message.time_Stamp = new Date().toISOString();
            return await this.dao.addMessage(message);
        } catch (error) {
            console.log(error);
        }
    }

    async getAllMessages(){
        try {
            return await this.dao.getAllMessages();
        } catch (error) {
            console.log(error);
        }
    }

    async getMessagesByEmail(email){
        try {
            return await this.dao.getMessagesByEmail(email);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = {
    ChatService
}