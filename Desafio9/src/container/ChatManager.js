const options= require ( "../options/mysql3config.js")
const knex= require ("knex");

const database = knex(options);

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
        table.string('user', 20);
        table.string('message', 50).nullable(false);
        table.string('time', 10);
        table.string('date', 10);
      })
      await database('chat').insert(message)
      console.log("Se creo la Tabla y se inserto el mensaje")
      return { status: "success", message: "Tablet Created", message: "Message Added" }
    }
  }


}

module.exports= ChatManager;