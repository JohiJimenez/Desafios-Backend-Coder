import mongoose from 'mongoose';
import session from "express-session";
import dotenv from 'dotenv';
import {koaBody} from 'koa-body';
import koa from 'koa';
import mount from 'koa-mount'
import logger from './utils/logger.js'
import {graphqlHTTP} from "koa-graphql";
import {schema, queriesAndMutations} from "./graphql/Schema.js";

const app = new koa();
const GRAPHQL_ENDPOINT = '/graphql';

app.use(koaBody());

dotenv.config({path:'./src/.env'});

 //Persistemcia Mongo Atlas
 import MongoStore from "connect-mongo";
 const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
 

// //Conexion con Mongoose
mongoose.connect(process.env.URL,advancedOptions, (err)=>{
    err
    ? logger.error("⛔ Error al conectarse a MongoDB")
    : logger.info("🆗 Conectados a MongoDB")
  })

app.use(mount(GRAPHQL_ENDPOINT, graphqlHTTP({
    schema, rootValue: {
        queriesAndMutations
    }, graphiql: true
})));


const PORT = 3000;
const server = app.listen(PORT, () => {
    logger.info(`🚀 Server started at http://localhost:${PORT}`)
    logger.info(`🕸️  GraphQL Playground: http://localhost:${PORT}${GRAPHQL_ENDPOINT}`)
})

server.on('error', (err) => log4jsLogger.error(err));