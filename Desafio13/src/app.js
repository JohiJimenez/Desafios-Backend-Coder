const express = require('express');
const { Server } = require('socket.io');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const path= require('path');
const mongoose= require('mongoose');
const passport = require('passport');
require('dotenv').config({path:'./src/.env'});
const cluster= require ('cluster')
const minimist= require ('minimist')
const os= require ('os')

const usersService= require('./model/users.js')

const ProductManager = require('./container/ProductManager.js')
const ChatManager = require  ('./container/ChatManager.js')
const sessionRouter = require ('./routes/session.js')
const registerRouter = require ('./routes/register.js')
const infoRouter = require ('./routes/info.js')
const randoms = require ('./routes/randoms.js')

const handlebars= require ('express-handlebars')

const args = minimist(process.argv.slice(2))
const clusterMode = args.modo || 'FORK'
const PORT = args.puerto || 8080 
console.log(clusterMode)

const numCPUs= os.cpus().length
const app = express();


if (clusterMode == 'CLUSTER' && cluster.isPrimary){
      console.log(`Master ${process.pid} is running`)
      for (let i = 0; i < numCPUs; i++) {
          cluster.fork();
      }
      cluster.on('online', (worker) => {
      console.log(`Worker ${worker.process.pid} is online`);
      });
      cluster.on('exit', (worker)=>{
      console.log(`Worker ${worker.proccess.pid} died`)
      cluster.fork();
      })     
} else {

//Server Conecction 
//const PORT = process.env.PORT||8080;
const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
const io = new Server(server);

//Persistemcia Mongo Atlas
const MongoStore = require("connect-mongo");
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

//Conexion con Mongoose
mongoose.connect(process.env.URL,advancedOptions, ()=>{
  console.log("Base Moongose Conectada")
})


//Session config
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:process.env.URL ,
      ttl: 600,
      mongoOptions: advancedOptions,
    }),
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    autoRemove: 'interval',
    autoRemoveInterval: 10
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


//Passport
app.use(passport.initialize());
app.use(passport.session());

//Serializar 

passport.serializeUser((user, done) => {
  done(null, user.id);
});


//Deserializar
passport.deserializeUser(async (id, done) => {
  const user = await usersService.findById(id);
  done(null, user);
});


//Rutas
app.get("/", (req, res) => {
  if (!req.session.user) {
    res.redirect("/login");
    console.log("no hay usuario")
  }
});

app.use("/",sessionRouter)
app.use("/",registerRouter)
app.use("/",infoRouter)
app.use("/",randoms)



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

}

