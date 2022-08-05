const options = require("../options/mysql3config.js")
const knex = require("knex");
const fs = require('fs')

const path = __dirname + "/../db/chat.json"


const database = knex(options);

let dataList = []

class ChatManager {

  //Crea la tabla
  addTable = async (message) => {
    let tableExist = await database.schema.hasTable('chat');
    if (tableExist) {
      await database('chat').insert(message)
      console.log("Se inserto el message")
      return { status: "success", message: "Message Add" }
    } else {
      await database.schema.createTable('chat', table => {
        table.string('id', 20);
        table.string('message', 50).nullable(false);
        table.string('name', 10);
        table.string('last_Name', 10);
        table.string('age', 2);
        table.string('nickname', 10);
        table.string('time', 10);
        table.string('date', 10);
      
      })
      await database('chat').insert(message)
      console.log("Se creo la Tabla y se inserto el mensaje")
      return { status: "success", message: "Tablet Created", message: "Message Added" }
    }
  }

 

  getAll = async () =>{ 

    return await database.from('chat').select('*') 
  }

}


module.exports = ChatManager;