const express = require('express');
const { Server } = require('socket.io');
const ProductManager = require('./container/ProductManager.js')

PORT = process.env.PORT || 8080;
const app = express();
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(server);

app.use(express.static(__dirname + '/public'));

const productsService = new ProductManager;

let log = [];

io.on('connection', async socket => {
    //se repite para que se muestren en tiempo real lo que ya habia antes para cada cliente que se conecte
    let products = await productsService.getAll();
    io.emit('productsReg', products)

    socket.on('sendProduct', async data => {
        await productsService.createProduct(data);
        let products = await productsService.getAll();
        io.emit('productsReg', products)
    })

    socket.broadcast.emit('newUser')
    socket.on('message', data => {
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()
        log.push(data);
        socket.emit('log', log);
        console.log(log)

    })
    socket.on('registered', data => {
        socket.emit('log', log);
    })
})

