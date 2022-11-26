const { ChatService } = require("./ChatService");
const chatService = new ChatService(process.env.NODE_ENV);

const socketServer = async (io, socket) => {

    socket.emit("messages", await chatService.getAllMessages());

    socket.on("new_message", async (message) => {
        await chatService.addMessage(message);
        io.sockets.emit("messages", await chatService.getAllMessages());
    })
}

module.exports = {
    socketServer
}