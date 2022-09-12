import express from 'express';
import passport from 'passport';
import {Strategy} from 'passport-local';
import bcrypt from'bcrypt';
const { Router } = express;
const router = new Router();


import {usersService} from '../model/users.js'
import logger from '../utils/logger.js';

const localStrategy= Strategy
passport.use(new localStrategy((username, password, done) => {
    usersService.findOne({username }, (err, user) => {
      if (err) console.log(err);
      if (!user) {
        console.log(`User : ${username} Not Found`)
        return done(null, false);
      }
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) return done(null, user);
        if (!isMatch) {
          console.log('Invalid Password')
          return done(null, false);
        }
      });
    });
  })
);



router.get("/login",(req, res) => {
  logger.info(`[${req.method}] ${req.originalUrl}`)
    res.render("login")
 })

router.post("/login",passport.authenticate("local", { failureRedirect: "errorLogin" }),
(req, res) => {
 const  user = req.body.username;
  const password= req.body.password
  req.session.user = user;
  return res.render("inicio",{nombre: user})
});



router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.render("bye");
    } else res.send({ status: "Logout ERROR", body: err });
  });
  
  });

  router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
  });

export default router