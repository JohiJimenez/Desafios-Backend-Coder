const express = require('express');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const bcrypt= require('bcrypt');
const { Router } = express;
const router = new Router();

const usersService= require('../model/users.js')

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
    res.render("login")
 })

router.post("/login",passport.authenticate("local", { failureRedirect: "errorLogin" }),
(req, res) => {
  user = req.body.username;
  password= req.body.password
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

module.exports = router