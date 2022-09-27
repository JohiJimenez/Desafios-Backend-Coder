
import express from 'express';
import bcrypt from 'bcrypt';
import {notifyNewUser} from '../utils/email.js'

const app = express();
const { Router } = express;''
const router = new Router();


import {usersService} from '../model/users.js'

import {middlewareImage} from '../middlewars/multer.js'

router.get("/errorRegister", (req, res) => {
    res.render("errorRegister");
  });
  
  router.get("/register", (req, res) => {
    res.render("register");
  });

  router.post("/register",middlewareImage, async (req, res) => {
    const username= req.body.username
    const password= req.body.password  //   const email= req.body.email
    const email= req.body.email
      let file = req.body.avatar
      const avatar= req.protocol + "://" + req.hostname + ":8080/img/" + file
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
          password: hashedPassword,
          email,
          avatar
        });
        await userData.save();
        await notifyNewUser(userData);
        res.redirect("/login");
      }
    });
  });



  export default router

