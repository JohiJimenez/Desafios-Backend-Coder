const express = require('express')
const ChatManager = require('../container/ChatManager.js')
const { normalize, denormalize, schema } = require("normalizr");

const app = express();
const { Router } = express;
const router = new Router();
const util = require('util')
const chatService = new ChatManager;


function print(objeto) {
    console.log(util.inspect(objeto, false, 12, true))
}


router.get("/", async (req, res) => {
    let messages = await chatService.getAll();
    ///PRIMER FORMA
    // const authorSchema = new schema.Entity('author', {}, { idAttribute: "id" });
    // const message = new schema.Entity("messages", {
    //     autor: authorSchema
    // })
    // const messageSchema = new schema.Entity('chat',{
    //     message : [message]
    // });
    // const normalizedMensajes = normalize(result, messageSchema);

    
    //const denormalizedMessages = normalize(normalizedMensajes.result, [chatSchema], normalizedMensajes.entities);



    ///SEGUNDA FORMA

    const authorSchema = new schema.Entity('author', {}, { idAttribute: "id" });
    const chatSchema = new schema.Entity("messages", {
        author: authorSchema,
    })
    const normalizedMessages = normalize(messages, chatSchema);

    const denormalizedMessages = denormalize(normalizedMessages.result,[chatSchema] , normalizedMessages.entities);


    console.log(' ------------- OBJETO NORMALIZADO --------------- ')
    //print(normalizedMessages)
    console.log(JSON.stringify(normalizedMessages,null,'\t'))

    console.log(' ------------- OBJETO DESNORMALIZADO --------------- ')
    console.log(JSON.stringify(denormalizedMessages,null,'\t'))
    //print(denormalizedMessages)


    res.send(normalizedMessages)

});

module.exports = router