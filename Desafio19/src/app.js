import express from 'express';
import { Server } from 'socket.io';
import session from "express-session";
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import {graphqlHTTP} from "express-graphql";
import {schema} from "./graphql/schema.js";
import dotenv from 'dotenv';
dotenv.config({path:'./src/.env'});
import logger from './utils/logger.js'
import loggerMiddleware from './middlewars/loggerRoutes.js'
import { usersModel } from './model/users.js';
import ProductService from "./services/productsService.js"
import indexRouter from './routes/index.js'

import handlebars from 'express-handlebars'

const app = express();

 //Persistemcia Mongo Atlas
import MongoStore from "connect-mongo";
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };

// //Conexion con Mongoose
mongoose.connect(process.env.URL,advancedOptions, (err)=>{
  err
  ? logger.error("⛔ Error al conectarse a MongoDB")
  : logger.info("🆗 Conectados a MongoDB")
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
app.use(express.static('/public'));
app.use(cookieParser());

const productsService = new ProductService;


async function getAllProductos() {
  return productsService.getAll();
}

async function createProduct({data}) {
  return productsService.create(data);
}

async function getProductById({id}) {
  return productsService.getProductById(id);
}

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
  const user = await usersModel.findById(id);
  done(null, user);
});


//Rutas
app.use("/",indexRouter)

app.use(
  '/graphql',
  graphqlHTTP({
          schema,
          rootValue: {
              getAllProductos,
              createProduct,
              getProductById
          },
          graphiql: true
      }
  )
);

app.all('*', (req, res) => {
  logger.warn("Page not found");
  res.status(404).json({"error": "Route does Not Exists"})
});

//Server Conecction - Socket Conecction
const PORT = process.env.PORT||8080;
const server = app.listen(PORT, () => logger.info(`Listening on port ${PORT}`))
server.on("error", (error) => {
  logger.error(error);
});

const io = new Server(server);




io.on('connection', async socket => {
  //se repite para que se muestren en tiempo real lo que ya habia antes para cada cliente que se conecte
    let products = await productsService.getAll();

    io.emit('productsReg', products)
   
})
