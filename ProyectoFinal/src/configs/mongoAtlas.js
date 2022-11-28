const mongoose = require('mongoose');
const express = require('express')
const session = require('express-session');
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoStore= require('connect-mongo');
const passport = require('passport');
const app = express();


module.exports = {
    connection: null,
    connect: () => {
        if (this.connection) return this.connection;
        return mongoose.connect(process.env.MONGO_ATLAS_URL, advancedOptions).then(connection => {
            this.connection = connection;
            console.log('Conexion a DB exitosa');
        }).catch(err => console.log(err))
    }
}
 
 app.use(
   session({
     store: MongoStore.create({
       mongoUrl:process.env.MONGO_ATLAS_URL,
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
  
 app.use(passport.session());