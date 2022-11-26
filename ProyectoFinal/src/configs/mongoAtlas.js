const mongoose = require('mongoose');
const express = require('express')
const advancedOptions = { useNewUrlParser: true, useUnifiedTopology: true };
const MongoStore= require('connect-mongo');
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

  