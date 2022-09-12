
import express from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
const app = express();
const { Router } = express;
const router = new Router();


import {usersService} from '../model/users.js'


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

  export default router

