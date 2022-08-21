
const express = require('express');
const mongoose= require('mongoose');
const bcrypt= require('bcrypt');
const app = express();
const { Router } = express;
const router = new Router();


const usersService= require('../model/users')


//Autenticacion
function auth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.render("register-error");
  }
}

router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
  });
  
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register", async (req, res) => {
    const name= req.body.name
   const password= req.body.password
    usersService.findOne({name}, async (err, user) => {
      if (err) console.log(err);
      if (user) res.render("register-error");
      if (!user) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = new usersService({
          name,
          password: hashedPassword
        });
        console.log(name,password);
        console.log(userData)
        await userData.save();
        res.redirect("/login");
      }
    });
  });


  module.exports = router