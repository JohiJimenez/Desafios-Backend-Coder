
const express = require('express');
const { Router } = express;
const router = new Router();
const { fork } = require("child_process");

router.get("/info", (req, res) => {
    const args =
      process.argv.length > 2 ? process.argv.slice(2).join(", ") : "ninguno";
  
    res.send(`
      <ul>  
      <li>Argumentos de entrada: ${args}</li> 
      <li>Path de ejecución: ${process.execPath}</li>
      <li>Sistema operativo: ${process.platform}</li>
      <li>ID: ${process.pid}</li>
      <li>Node version: ${process.version}</li>
      <li>Carpeta del proyecto: ${process.cwd()}</li>
    <li>Memoria total reservada: ${`${Math.round(
      process.memoryUsage().rss / 1024
    )} KB`}</li>
  </ul>`);
  });


  module.exports = router