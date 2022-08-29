
const express = require('express');
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const app = express();
const { Router } = express;
const router = new Router();


const usersService= require('../model/users')


router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
  });
  
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", async (req, res) => {
    const username= req.body.username
   const password= req.body.password
    usersService.findOne({username}, async (err, user) => {
      if (err) console.log(err);
      if (user){
        console.log(`User: ${username} already Exist`)
        res.render("errorRegister");
      } 
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new usersService({
          username,
          password: hashedPassword
        });
        await userData.save();
        res.redirect("/login");
      }
    });
  });

//   const data= {
//     ArgumentosDeEntrada: args,
//     PathDeEjecucion: process.execPath,
//     SistemaOperativo: process.platform,
//     idProcess: process.pid,
//     NodeVersion: process.version,
//     CarpetaDelProyecto: process.cwd(),
//   MemoriaTotalReservada: process.memoryUsage().rss
// }
// console.log(data)
  module.exports = router

