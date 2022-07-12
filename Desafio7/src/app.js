import express from 'express';
import { Server } from 'socket.io'
import ProductManager from './container/ProductManager.js'
import ChatManager from './container/ChatManager.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename);


const app = express();
const server = app.listen(8080, () => console.log(`Listening on port`))
const io = new Server(server);

app.use(express.static('public'));

const productsService = new ProductManager;
const chatService = new ChatManager;

let log = [];

io.on('connection', async socket => {
    //Lo comento porq me da error, necesita la base de datos para arrancar con los prod cargados.
    //let products = await productsService.getAll();
    // io.emit('productsReg', products)

    socket.on('sendProduct', async data => {
        await productsService.addProduct(data);
        let products = await productsService.getAll();
        io.emit('productsReg', products)
    })

    socket.broadcast.emit('newUser')

    socket.on('message', data => {
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()
        log.push(data);
        chatService.addTable(data)
        io.emit('log', log);
    })

    socket.on('registered', data => {
        socket.emit('log', log);
    })

})