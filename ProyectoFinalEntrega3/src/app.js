import express from 'express';
import { Server } from 'socket.io';
import session from "express-session";
import cookieParser from 'cookie-parser';
import path from 'path';
import mongoose from 'mongoose';
import passport from 'passport';
import dotenv from 'dotenv';
dotenv.config({path:'./src/.env'});
//import compression from 'compression'
import logger from './utils/logger.js'
import loggerMiddleware from './middlewars/loggerRoutes.js'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import {usersService} from './model/users.js'

import ProductManager from './container/ProductManager.js'

import sessionRouter from './routes/session.js'
import registerRouter from './routes/register.js'
import infoRouter from './routes/info.js'
import randoms from './routes/randoms.js'

import handlebars from 'express-handlebars'

const app = express();

//app.use(compression());

//Persistemcia Mongo Atlas
import MongoStore from "connect-mongo";
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
app.use(loggerMiddleware);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views/layouts"));
app.set('views','./src/views')
app.use(express.static(__dirname+'/public')) 
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


//Server Conecction - Socket Conecction
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
server.on("error", (error) => {
  logger.error(error);
});
const io = new Server(server);


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
   
})

