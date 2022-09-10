const express = require('express');
const path= require('path');
const os= require ('os')
const { fork } = require("child_process");
const randoms = require ('./routes/randoms.js')

const handlebars= require ('express-handlebars')

const PORT = parseInt(process.argv[2]) || 8080;

const app = express();


//Server Conecction 

const server = app.listen(PORT, () => console.log(`Listening on port ${PORT}`))

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./views/layouts"));
app.set('views', path.join(__dirname, 'views'))
//app.use(express.static(__dirname + '/public'));


//Motor de Plantilla
app.engine('handlebars',handlebars.engine());
app.set('view engine','handlebars');



//Rutas//
app.get("/random", (req, res) => {
 const max=1
  const randoms = fork('./utils/calculoRandom.js' )
  randoms.send(max)
  console.log(`Puerto de escucha: ${PORT}`)
  randoms.on('message', resultado => {
    res.send(resultado )
  })
  });

  app.use("/inicio", (req, res) => {
    res.send(`Puerto: ${PORT}`)
  });





