const express = require('express');
const { Server } = require('socket.io');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const path= require('path');

const ProductManager = require('./container/ProductManager.js')
const ChatManager = require  ('./container/ChatManager.js')
const sessionRouter = require ('./routes/session.js')
const handlebars= require ('express-handlebars')

const app = express();

//Persistemcia Mongo Atlas
const MongoStore = require("connect-mongo");
const adavancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };


//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:'mongodb+srv://Johi:17418016jC@cluster0.nwwqozn.mongodb.net/Sessions?retryWrites=true&w=majority' ,
      ttl:10,
      mongoOptions: adavancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views/layouts"));
app.set('views', path.join(__dirname, 'views'))
app.use(express.static(__dirname + '/public'));
app.use(cookieParser());


//Motor de Plantilla
app.engine('handlebars',handlebars.engine());
app.set('view engine','handlebars');

//Rutas
app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
    console.log("no hay usuario")
  }
});

app.get("/errorLogin", (req, res) => {
  res.render("errorLogin");
});

app.get("/errorRegister", (req, res) => {
  res.render("errorRegister");
});

app.get("/register", (req, res) => {
  res.render("register");
});


app.use("/",sessionRouter)


//Server Conecction - Socket Conecction
PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(server);


const productsService = new ProductManager;
const chatService= new ChatManager;

let log = [];


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

    socket.broadcast.emit('newUser', ()=>{
     
    } )

    socket.on('message', async (data) => {
        data.time = new Date().toLocaleTimeString()
        data.date = new Date().toLocaleDateString()  
        await chatService.addTable(data)
        let result= await chatService.getAll();

        socket.emit('log', result);  

    })
  
   
})

