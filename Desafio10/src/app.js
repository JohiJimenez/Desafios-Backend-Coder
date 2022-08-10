const express = require('express');
const { Server } = require('socket.io');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const ProductManager = require('./container/ProductManager.js')
const ChatManager = require  ('./container/ChatManager.js')
const sessionRouter = require ('./routes/session.js')

const handlebars= require ('express-handlebars')

PORT = process.env.PORT || 8080;

const app = express();
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(server);

app.use(express.static("./views/layouts"));
app.use(express.static(__dirname + '/public'));
app.engine('handlebars',handlebars.engine());
app.set('view engine','handlebars');
app.use(cookieParser());


app.use("/",sessionRouter)

const productsService = new ProductManager;
const chatService= new ChatManager;

let log = [];

/*      PERSISTENCIA POR MONGO ATLAS     */
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
/* ------------------------------------- */

//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl: 'mongodb+srv://Johi:17418016jC@cluster0.nwwqozn.mongodb.net/Usersessions?retryWrites=true&w=majority' ,
      ttl:200,
      mongoOptions: adavancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);
io.on('connection', async socket => {
    //se repite para que se muestren en tiempo real lo que ya habia antes para cada cliente que se conecte
    let products = await productsService.getAll();

    //Si no esta la Base de Datos Creada no funciona
    let result= await chatService.getAll();
    socket.emit('log', result); 

    io.emit('productsReg', products)

    socket.on('sendProduct', async data => {
        await productsService.createProduct(data);
        let products = await productsService.getAll();
        io.emit('productsReg', products)
    })

    socket.broadcast.emit('newUser')
    socket.on('message', async (data) => {
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()  
        await chatService.addTable(data)
        let result= await chatService.getAll();

        socket.emit('log', result);  

    })
  
   
})

